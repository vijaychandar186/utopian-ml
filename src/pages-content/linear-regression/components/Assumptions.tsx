import { Card, CardContent } from '@/components/ui/card';
import { assumptionsContent } from '@/pages-content/linear-regression/content/linear-regression-content';

const SEVERITY_COLOR: Record<string, string> = {
  High: 'destructive',
  Medium: 'chart-3',
  'Low (prediction)': 'chart-2'
};

export function Assumptions() {
  return (
    <section className='mb-16'>
      <h2 className='mb-6 text-xl font-semibold'>{assumptionsContent.title}</h2>
      <Card>
        <CardContent>
          <p className='text-muted-foreground mb-6 leading-relaxed'>
            {assumptionsContent.description}
          </p>

          <div className='mb-6 space-y-3'>
            {assumptionsContent.assumptions.map((a, i) => (
              <div
                key={i}
                className={`bg-muted rounded-md border-l-[3px] p-4 border-chart-${a.chartColor}`}
              >
                <div className='mb-1 flex items-center gap-3'>
                  <h4 className={`text-chart-${a.chartColor} font-semibold`}>
                    {a.name}
                  </h4>
                  <span
                    className={`text-${SEVERITY_COLOR[a.severity]} rounded text-xs font-medium opacity-80`}
                  >
                    severity: {a.severity}
                  </span>
                </div>
                <code
                  className={`text-chart-${a.chartColor} mb-1 block font-mono text-xs`}
                >
                  {a.formula}
                </code>
                <p className='text-muted-foreground text-sm'>{a.description}</p>
              </div>
            ))}
          </div>

          <div className='mb-6'>
            <h4 className='mb-3 font-medium'>Diagnostic Plots</h4>
            <div className='grid gap-3 sm:grid-cols-2'>
              {assumptionsContent.diagnostics.map((d, i) => (
                <div
                  key={i}
                  className={`bg-muted rounded-md border-l-[3px] p-3 border-chart-${i + 1}`}
                >
                  <code
                    className={`text-chart-${i + 1} mb-0.5 block font-mono text-xs font-bold`}
                  >
                    {d.plot}
                  </code>
                  <p className='text-muted-foreground text-xs'>
                    Detects: {d.detects}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className='border-chart-2 bg-chart-2/5 rounded-md border-l-4 p-4'>
            <h4 className='text-chart-2 mb-1 font-semibold'>
              Gauss-Markov Theorem
            </h4>
            <p className='text-muted-foreground text-sm'>
              {assumptionsContent.gaussMarkov}
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
