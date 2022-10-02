import {
  LifeProvider,
  LifeSettingsProvider,
  MouseStateProvider,
  TooltipProvider
} from '../contexts';
import { LifeActions, LifeBoard, LifeSettings } from './life';

const App = () => {
  return (
    <div className="min-h-screen grid grid-rows-[max-content_1fr_max-content]">
      <header className="py-10 flex justify-center">
        <h1 className="
          relative font-extrabold text-6xl uppercase text-center tracking-wide
          bg-gradient-to-br from-slate-100 to-slate-300 bg-clip-text text-transparent
        ">
          Life
        </h1>
      </header>
      <main>
        <MouseStateProvider>
          <TooltipProvider>
            <LifeSettingsProvider>
              <LifeProvider>
                <div className="flex flex-col md:flex-row md:justify-center gap-4 m-4 md:m-0">
                  <LifeBoard />
                  <div className="flex flex-col gap-4">
                    <LifeActions />
                    <LifeSettings />
                  </div>
                </div>
              </LifeProvider>
            </LifeSettingsProvider>
          </TooltipProvider>
        </MouseStateProvider>
      </main>
      <footer className="text-slate-400 text-sm py-2 px-4 text-right">
        Coded with ❤️ by <a
          href="https://gstill.dev"
          className="text-sky-300 hover:text-sky-200 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          Graham Still
        </a>
      </footer>
    </div>
  )
};

export default App;
