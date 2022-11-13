import {
  LifeProvider,
  LifeSettingsProvider,
  MouseStateProvider,
  TooltipProvider
} from '@/contexts';
import { LifeActions, LifeBoard, LifeSettings } from './life';
import { Header, Footer } from '.';

const App = () => {
  return (
    <div className="min-h-screen grid grid-rows-[max-content_1fr_max-content] bg-pattern-signal">
      <Header />

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
