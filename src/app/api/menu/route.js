import { MenuModel } from "@/models/menu-model";
import { existsSync } from "fs";
import { mkdir, unlink, writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import { extname, join } from "path";
import connectMongo from "../../../../db/connectMongo";

// Ensure upload directory exists
async function ensureUploadDir() {
  const uploadDir = join(process.cwd(), "public", "uploads", "menu");
  if (!existsSync(uploadDir)) {
    await mkdir(uploadDir, { recursive: true });
  }
  return uploadDir;
}

// Save uploaded file
async function saveFile(file, oldImagePath = null) {
  const uploadDir = await ensureUploadDir();
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Get original filename and extension
  const originalFilename = file.name;
  const fileExt = extname(originalFilename);
  const filenameWithoutExt = originalFilename.replace(fileExt, "");

  // Create sanitized filename (remove special characters)
  const sanitizedFilename = filenameWithoutExt.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase();

  // Check if file already exists
  let finalFilename = `${sanitizedFilename}${fileExt}`;
  let filepath = join(uploadDir, finalFilename);

  // If file exists, add timestamp to make it unique
  if (existsSync(filepath)) {
    finalFilename = `${sanitizedFilename}-${Date.now()}${fileExt}`;
    filepath = join(uploadDir, finalFilename);
  }

  // Write the file
  await writeFile(filepath, buffer);

  // If updating an image, delete the old one
  if (oldImagePath) {
    try {
      // Extract filename from path (e.g., /uploads/menu/image.jpg -> image.jpg)
      const oldFilename = oldImagePath.split("/").pop();
      const oldFilepath = join(uploadDir, oldFilename);

      // Check if file exists before attempting to delete
      if (existsSync(oldFilepath)) {
        await unlink(oldFilepath);
        console.log(`Deleted old image: ${oldFilepath}`);
      }
    } catch (error) {
      console.error("Error deleting old image:", error);
      // Continue even if delete fails
    }
  }

  return `/uploads/menu/${finalFilename}`;
}

// GET: Fetch all menu items
export async function GET() {
  try {
    await connectMongo();
    // const menuItems = await MenuModel.find().sort({ _id: -1 });
    const menuItems = await MenuModel.find();
    return NextResponse.json(menuItems);
  } catch (error) {
    console.error("Error fetching menu items:", error);
    return NextResponse.json({ error: "Failed to fetch menu items" }, { status: 500 });
  }
}

// POST: Create a new menu item
export async function POST(request) {
  try {
    await connectMongo();

    const formData = await request.formData();
    const title = formData.get("title");
    const description = formData.get("description");
    const price = formData.get("price");
    const imageFile = formData.get("image");
    const menuType = formData.get("menuType");

    console.log(menuType);
    // Validate required fields
    if (!title || !description || !price || !menuType) {
      return NextResponse.json({ error: "Title, description, and price are required" }, { status: 400 });
    }

    // Handle image upload
    let imagePath = null;
    if (imageFile && imageFile.size > 0) {
      imagePath = await saveFile(imageFile);
    } else {
      return NextResponse.json({ error: "Image is required" }, { status: 400 });
    }

    // Create new menu item
    const newMenuItem = new MenuModel({
      title,
      description,
      price: Number.parseFloat(price),
      image: imagePath,
      menuType,
    });

    await newMenuItem.save();
    return NextResponse.json(newMenuItem, { status: 201 });
  } catch (error) {
    console.error("Error creating menu item:", error);
    return NextResponse.json({ error: "Failed to create menu item" }, { status: 500 });
  }
}

// PATCH: Update an existing menu item
export async function PATCH(request) {
  try {
    await connectMongo();

    const formData = await request.formData();
    const id = formData.get("id");
    const title = formData.get("title");
    const description = formData.get("description");
    const price = formData.get("price");
    const imageFile = formData.get("image");
    const menuType = formData.get("menuType");

    console.log(menuType, "menuType");
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    // Find the existing menu item to get the old image path
    const existingMenuItem = await MenuModel.findById(id);
    if (!existingMenuItem) {
      return NextResponse.json({ error: "Menu item not found" }, { status: 404 });
    }

    // Prepare update data
    const updateData = {
      title,
      description,
      price: Number.parseFloat(price),
      menuType,
    };

    // Handle image upload if a new image is provided
    if (imageFile && imageFile.size > 0) {
      // Pass the old image path to saveFile for deletion
      updateData.image = await saveFile(imageFile, existingMenuItem.image);
    }

    const updatedMenuItem = await MenuModel.findByIdAndUpdate(id, updateData, { new: true });

    return NextResponse.json(updatedMenuItem);
  } catch (error) {
    console.error("Error updating menu item:", error);
    return NextResponse.json({ error: "Failed to update menu item" }, { status: 500 });
  }
}

// DELETE: Delete an existing menu item
export async function DELETE(request) {
  try {
    await connectMongo();

    const data = await request.json();
    const { id } = data;

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    // Find the menu item to get the image path before deleting
    const menuItem = await MenuModel.findById(id);

    if (!menuItem) {
      return NextResponse.json({ error: "Menu item not found" }, { status: 404 });
    }

    // Delete the image file if it exists
    if (menuItem.image) {
      try {
        const uploadDir = await ensureUploadDir();
        const filename = menuItem.image.split("/").pop();
        const filepath = join(uploadDir, filename);

        if (existsSync(filepath)) {
          await unlink(filepath);
          console.log(`Deleted image: ${filepath}`);
        }
      } catch (error) {
        console.error("Error deleting image file:", error);
        // Continue with deletion even if file removal fails
      }
    }

    // Delete the menu item from the database
    await MenuModel.findByIdAndDelete(id);

    return NextResponse.json({ message: "Menu item deleted successfully" });
  } catch (error) {
    console.error("Error deleting menu item:", error);
    return NextResponse.json({ error: "Failed to delete menu item" }, { status: 500 });
  }
}
