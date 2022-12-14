import type { CardProps } from '../Card';
import { useLife } from '@/hooks';
import { Button, Card } from '..';

type LifeActionsProps = CardProps & {
  className?: string
};

const LifeActions = ({ className = '', ...props }: LifeActionsProps) => {
  const {
    reset,
    randomize,
    start,
    stop,
    isSimulating
  } = useLife();

  return (
    <Card className={`grid grid-cols-2 gap-3 ${className}`} {...props}>
      <Button onClick={randomize}>
        Randomize
      </Button>
      <Button onClick={reset}>
        Clear
      </Button>
      <Button
        onClick={isSimulating ? stop : start}
        className="col-span-full"
        variant={isSimulating ? 'danger' : 'success'}
      >
        {isSimulating ? 'Stop' : 'Start'}
      </Button>
    </Card>
  );
};

export default LifeActions;
