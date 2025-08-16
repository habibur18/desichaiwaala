import { MenuModel } from "@/models/menu-model";
import { del, put } from "@vercel/blob";
import { NextResponse } from "next/server";
import connectMongo from "../../../../db/connectMongo";

// Upload file to Vercel Blob
async function uploadToBlob(file, oldImageUrl = null) {
  try {
    // Get original filename and create a unique filename
    const originalFilename = file.name;
    const fileExt = originalFilename.split(".").pop();
    const filenameWithoutExt = originalFilename.replace(`.${fileExt}`, "");

    // Create sanitized filename (remove special characters)
    const sanitizedFilename = filenameWithoutExt.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase();

    // Create unique filename with timestamp
    const uniqueFilename = `menu/${sanitizedFilename}-${Date.now()}.${fileExt}`;

    // Upload to Vercel Blob
    const blob = await put(uniqueFilename, file, {
      access: "public",
    });

    // If updating an image, delete the old one
    if (oldImageUrl) {
      try {
        await del(oldImageUrl);
        console.log(`Deleted old image: ${oldImageUrl}`);
      } catch (error) {
        console.error("Error deleting old image:", error);
        // Continue even if delete fails
      }
    }

    return blob.url;
  } catch (error) {
    console.error("Error uploading to blob:", error);
    throw new Error("Failed to upload image");
  }
}

// GET: Fetch all menu items
export async function GET() {
  try {
    await connectMongo();
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
      return NextResponse.json({ error: "Title, description, price, and menu type are required" }, { status: 400 });
    }

    // Handle image upload
    let imageUrl = null;
    if (imageFile && imageFile.size > 0) {
      imageUrl = await uploadToBlob(imageFile);
    } else {
      return NextResponse.json({ error: "Image is required" }, { status: 400 });
    }

    // Create new menu item
    const newMenuItem = new MenuModel({
      title,
      description,
      price: Number.parseFloat(price),
      image: imageUrl,
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

    // Find the existing menu item to get the old image URL
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
      // Pass the old image URL to uploadToBlob for deletion
      updateData.image = await uploadToBlob(imageFile, existingMenuItem.image);
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

    // Find the menu item to get the image URL before deleting
    const menuItem = await MenuModel.findById(id);

    if (!menuItem) {
      return NextResponse.json({ error: "Menu item not found" }, { status: 404 });
    }

    // Delete the image from Vercel Blob if it exists
    if (menuItem.image) {
      try {
        await del(menuItem.image);
        console.log(`Deleted image: ${menuItem.image}`);
      } catch (error) {
        console.error("Error deleting image from blob:", error);
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
