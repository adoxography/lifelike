import GithubIcon from '@/assets/github-icon.png';

const Footer = () => {
  return (
    <footer className="text-slate-400 text-sm mt-4 py-2 px-6 flex justify-end">
      <div className="flex gap-2 items-center">
        <p>
          Coded with ❤️ by <a
            href="https://gstill.dev"
            className="text-sky-300 hover:text-sky-200 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Graham Still
          </a>
        </p>
        <span>&bull;</span>
        <a
          href="https://github.com/adoxography/lifelike"
          target="_blank"
          rel="noopener noreferrer"
          className="relative group"
        >
          <div className="absolute left-0 top-0 w-full h-full bg-sky-300 mix-blend-darken opacity-0 group-hover:opacity-100 transition-opacity" />
          <img
            src={GithubIcon}
            width="24px"
            height="24px"
            alt="GitHub"
          />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
