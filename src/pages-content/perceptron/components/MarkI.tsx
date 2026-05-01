import { Card, CardContent } from '@/components/ui/card';

const specs = [
  {
    label: 'Input layer',
    value: '400 photocells arranged in a 20×20 grid — the "retina"'
  },
  {
    label: 'Weights',
    value:
      'Motor-driven potentiometers — physical variable resistors turned by small electric motors'
  },
  {
    label: 'Learning',
    value:
      'When the output was wrong, motors physically rotated the potentiometer knobs — the machine literally rewired itself'
  },
  {
    label: 'Connections',
    value:
      'Patch cables plugged by hand between units — the wiring topology was partially random, partially hand-configured'
  },
  {
    label: 'Association units',
    value: '512 intermediate units randomly connected to the retina'
  },
  {
    label: 'Task',
    value:
      'Classify 20×20 pixel images of handwritten letters and simple shapes'
  },
  {
    label: 'Hardware',
    value:
      'IBM 704 computer + custom analog hardware, built at Cornell Aeronautical Laboratory for the U.S. Navy'
  }
];

export function MarkI() {
  return (
    <section className='mb-16'>
      <h2 className='mb-6 text-xl font-semibold'>
        The Mark I: Hardware Perceptron
      </h2>
      <Card>
        <CardContent>
          <p className='text-muted-foreground mb-6 leading-relaxed'>
            The Perceptron was not just an algorithm—it was a physical machine.
            The Mark I Perceptron, built at Cornell Aeronautical Laboratory in
            1958 for the U.S. Navy, implemented learning entirely in hardware.
            Weights were not numbers in memory; they were physical
            potentiometers— variable resistors whose resistance could be changed
            by rotating a knob. Those knobs were turned by small electric
            motors. When the machine made a mistake, motors fired and the
            weights changed mechanically. The machine rewired itself.
          </p>

          {/* "Retina" visualization */}
          <div className='border-border mb-6 rounded-md border p-6'>
            <h4 className='text-muted-foreground mb-4 text-center text-sm font-medium'>
              Mark I Architecture
            </h4>
            <div className='flex flex-wrap items-center justify-center gap-4 overflow-x-auto'>
              {/* Retina grid */}
              <div className='text-center'>
                <div className='border-chart-1/50 bg-chart-1/10 inline-block rounded border p-2'>
                  <div className='grid grid-cols-5 gap-0.5'>
                    {Array.from({ length: 25 }).map((_, i) => (
                      <div
                        key={i}
                        className='bg-chart-1/40 h-3 w-3 rounded-sm'
                        style={{ opacity: 0.3 + Math.random() * 0.7 }}
                      />
                    ))}
                  </div>
                </div>
                <div className='text-muted-foreground mt-1 text-xs'>
                  400 photocells
                  <br />
                  (20×20 retina)
                </div>
              </div>

              <div className='text-muted-foreground flex flex-col items-center gap-1'>
                <div className='text-xs'>random</div>
                <div className='text-xl'>→</div>
                <div className='text-xs'>wires</div>
              </div>

              {/* Association units */}
              <div className='text-center'>
                <div className='border-chart-2/50 bg-chart-2/10 flex flex-col gap-1 rounded border p-3'>
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className='bg-chart-2/50 h-2 w-16 rounded-full'
                    />
                  ))}
                  <div className='text-chart-2/50 text-center text-xs'>⋮</div>
                </div>
                <div className='text-muted-foreground mt-1 text-xs'>
                  512 association
                  <br />
                  units
                </div>
              </div>

              <div className='text-muted-foreground flex flex-col items-center gap-1'>
                <div className='text-xs'>motor-driven</div>
                <div className='text-xl'>→</div>
                <div className='text-xs'>potentiometers</div>
              </div>

              {/* Output */}
              <div className='text-center'>
                <div className='border-primary bg-primary/10 flex h-16 w-16 items-center justify-center rounded-full border-2'>
                  <div className='text-center'>
                    <div className='text-primary text-lg font-bold'>Σ</div>
                    <div className='text-muted-foreground text-xs'>+</div>
                    <div className='text-chart-3 text-xs font-bold'>θ</div>
                  </div>
                </div>
                <div className='text-muted-foreground mt-1 text-xs'>
                  output
                  <br />
                  unit
                </div>
              </div>

              <div className='text-muted-foreground text-xl'>→</div>

              <div className='text-center'>
                <div className='border-chart-3/50 bg-chart-3/10 rounded border px-4 py-3'>
                  <div className='text-chart-3 font-bold'>0 / 1</div>
                </div>
                <div className='text-muted-foreground mt-1 text-xs'>
                  classification
                </div>
              </div>
            </div>
          </div>

          {/* Specs table */}
          <div className='mb-6 space-y-3'>
            {specs.map((s, i) => (
              <div key={i} className='grid grid-cols-[140px_1fr] gap-3 text-sm'>
                <span
                  className={`font-medium text-chart-${(i % 5) + 1} flex-shrink-0`}
                >
                  {s.label}
                </span>
                <span className='text-muted-foreground'>{s.value}</span>
              </div>
            ))}
          </div>

          {/* Potentiometer callout */}
          <div className='bg-muted border-chart-2 mb-4 rounded-md border-l-4 p-4'>
            <h4 className='text-chart-2 mb-2 font-semibold'>
              What is a potentiometer?
            </h4>
            <p className='text-muted-foreground text-sm'>
              A potentiometer is a variable resistor — a physical knob that
              controls how much electrical resistance it adds to a circuit. In
              the Mark I, each potentiometer corresponded to one weight wᵢ. Its
              resistance set how strongly that association unit influenced the
              output. A motor attached to the knob could increase or decrease
              the resistance in response to a learning signal — this was the
              physical implementation of wᵢ ← wᵢ + η(y−ŷ)xᵢ.
            </p>
          </div>

          <div className='border-primary/30 bg-primary/5 rounded-md border p-4'>
            <p className='text-muted-foreground text-sm'>
              <span className='text-foreground font-semibold'>
                Why it matters:{' '}
              </span>
              The Mark I proved that a machine could learn from examples without
              being explicitly programmed with rules. The New York Times called
              it &ldquo;the embryo of an electronic computer that the Navy
              expects will be able to walk, talk, see, write, reproduce itself
              and be conscious of its existence.&rdquo; The hype was
              overblown—but the core idea was right. Every GPU cluster training
              a modern LLM is doing the same thing the potentiometer motors were
              doing in 1958: adjusting weights based on error.
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
