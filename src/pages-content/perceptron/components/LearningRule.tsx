import { Card, CardContent } from '@/components/ui/card';
import { learningRuleContent } from '@/pages-content/perceptron/content/perceptron-content';

export function LearningRule() {
  const cases = [
    {
      y: 1,
      yhat: 1,
      error: 0,
      desc: 'Correct positive — no update',
      color: 'text-green-500'
    },
    {
      y: 0,
      yhat: 0,
      error: 0,
      desc: 'Correct negative — no update',
      color: 'text-green-500'
    },
    {
      y: 1,
      yhat: 0,
      error: 1,
      desc: 'Missed positive — increase weights toward x',
      color: 'text-chart-1'
    },
    {
      y: 0,
      yhat: 1,
      error: -1,
      desc: 'False positive — decrease weights away from x',
      color: 'text-red-400'
    }
  ];

  return (
    <section className='mb-16'>
      <h2 className='mb-6 text-xl font-semibold'>
        {learningRuleContent.title}
      </h2>
      <Card>
        <CardContent>
          <p className='text-muted-foreground mb-6 leading-relaxed'>
            {learningRuleContent.description}
          </p>

          {/* Update rule formulas */}
          <div className='bg-muted mb-6 space-y-2 rounded-md p-5'>
            <div className='text-center font-mono text-sm'>
              <span className='text-primary'>
                {learningRuleContent.rule.formula}
              </span>
            </div>
            <div className='text-center font-mono text-sm'>
              <span className='text-chart-2'>
                {learningRuleContent.rule.biasFormula}
              </span>
            </div>
          </div>

          {/* Four cases */}
          <div className='mb-6'>
            <h4 className='mb-3 font-medium'>All Possible Cases</h4>
            <div className='overflow-x-auto'>
              <table className='w-full text-sm'>
                <thead>
                  <tr className='border-border border-b'>
                    <th className='text-muted-foreground pb-2 text-left font-medium'>
                      y (true)
                    </th>
                    <th className='text-muted-foreground pb-2 text-left font-medium'>
                      ŷ (pred)
                    </th>
                    <th className='text-muted-foreground pb-2 text-left font-medium'>
                      y − ŷ
                    </th>
                    <th className='text-muted-foreground pb-2 text-left font-medium'>
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cases.map((c, i) => (
                    <tr key={i} className='border-border border-b'>
                      <td className='py-2 font-mono'>{c.y}</td>
                      <td className='py-2 font-mono'>{c.yhat}</td>
                      <td className={`py-2 font-mono font-bold ${c.color}`}>
                        {c.error}
                      </td>
                      <td className={`py-2 text-xs ${c.color}`}>{c.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Intuition */}
          <div className='mb-6 space-y-2'>
            {learningRuleContent.rule.explanation.map((line, i) => (
              <div key={i} className='flex items-start gap-2'>
                <span className='bg-primary text-primary-foreground mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-xs'>
                  {i + 1}
                </span>
                <p className='text-muted-foreground text-sm'>{line}</p>
              </div>
            ))}
          </div>

          {/* Learning rate */}
          <div className='bg-muted border-chart-3 mb-6 rounded-md border-l-4 p-4'>
            <h4 className='text-chart-3 mb-1 font-semibold'>
              {learningRuleContent.learningRate.name}
            </h4>
            <p className='text-muted-foreground text-sm'>
              {learningRuleContent.learningRate.description}
            </p>
          </div>

          {/* Convergence theorem */}
          <div className='border-primary/30 bg-primary/5 rounded-md border p-4'>
            <p className='text-muted-foreground text-sm'>
              <span className='text-foreground font-semibold'>
                Convergence Theorem:{' '}
              </span>
              {learningRuleContent.convergenceTheorem}
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
