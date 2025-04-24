const Logo = () => {
  return (
    <div className="flex p-5 justify-start items-center gap-2">
      <svg
        width="78"
        height="32"
        viewBox="0 0 78 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-md"
      >
        <path
          d="M10 0C4.48 0 0 4.48 0 10v8c0 5.52 4.48 10 10 10h3c0 2.21 1.79 4 4 4s4-1.79 4-4h3c5.52 0 10-4.48 10-10v-8c0-5.52-4.48-10-10-10H10z"
          fill="#8338ec"
        />
        <path
          d="M28 0c5.52 0 10 4.48 10 10v8c0 5.52-4.48 10-10 10h-3c0 2.21-1.79 4-4 4s-4-1.79-4-4h-3c-5.52 0-10-4.48-10-10v-8c0-5.52 4.48-10 10-10h3c0-2.21 1.79-4 4-4s4 1.79 4 4h3z"
          fill="#975aed"
        />
      </svg>
      <span className="text-3xl font-semibold text-[#8338ec]">WeChat</span>
    </div>
  );
};

export default Logo;
