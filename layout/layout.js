// import styles from "../styles/globals.css";

export default function Layout({ children }) {
  return (
    <div className="flex h-screen bg-[url('/photos/waves.svg')] ">
      <div className="m-auto bg-slate-50 rounded-md w-3/5 grid lg:grid-cols-2 h-3/2">
        {/* <div className="hidden relative">
          <div className="bg-[url('/photos/logo.png')]"></div>
        </div> */}
        <div className="right flex flex-col justify-evenly ">
          <div className="text-center py-10">{children}</div>
        </div>
      </div>
    </div>
  );
}
