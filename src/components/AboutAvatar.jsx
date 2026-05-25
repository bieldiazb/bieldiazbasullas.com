export default function AboutAvatar() {
  return (
    <div className="relative mx-auto mb-10 md:mb-14">
      <div className="rounded-full backdrop-blur-sm p-3">
        {/* Light */}
        <img
          src="/avatar-light.svg"
          alt="Avatar"
          className="
            block dark:hidden
            w-32 sm:w-36 md:w-40
            transition-transform duration-500 ease-out
            hover:scale-[1.04]
          "
          loading="lazy"
        />

        {/* Dark */}
        <img
          src="/avatar-dark.svg"
          alt="Avatar"
          className="
            hidden dark:block
            w-32 sm:w-36 md:w-44
            transition-transform duration-500 ease-out
            hover:scale-[1.04]
          "
          loading="lazy"
        />
      </div>
    </div>
  );
}
