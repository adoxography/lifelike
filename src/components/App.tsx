import {
  LifeProvider,
  LifeSettingsProvider,
  MouseStateProvider,
  TooltipProvider
} from '@/contexts';
import { LifeActions, LifeBoard, LifeSettings } from './life';
import { Footer } from '.';

const App = () => {
  return (
    <div className="min-h-screen grid grid-rows-[max-content_1fr_max-content]">
      <header className="py-10 flex justify-center">
        <h1 className="
          relative font-extrabold text-6xl uppercase text-center tracking-wider
          bg-gradient-to-br from-slate-100 to-slate-300 bg-clip-text text-transparent
        ">
          Lifelike
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
      <Footer />
    </div>
  )
};

export default App;
