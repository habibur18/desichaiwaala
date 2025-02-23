import HeaderMenu from "@/components/HeaderMenu";

export default function layout({ children }) {
  return (
    <div className="">
      <div className="bg-dark">
        <HeaderMenu />
      </div>
      {children}
    </div>
  );
}
