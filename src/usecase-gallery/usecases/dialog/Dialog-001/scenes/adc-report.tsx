import type { ContextProps } from '../../../../types';
import { Dialog, Tooltip, Type, View } from '../../../../kit';

// ADC report preview (src/adc/components/ReportFlow.tsx, ReportPreviewDialog): a raised Title whose close X is wrapped in a "Close" tooltip, then a Body with the no-padding profile
// holding one role="document" View that centres the preview text. The app popup is draggable and resizable; here it is a plain 520px popup. Left out: the generated PDF and the drag and resize handles.
export default function AdcReportScene({ host }: ContextProps) {
  return (
    <Dialog open modal={false}>
      <Dialog.Portal container={host}>
        <Dialog.Backdrop />
        <Dialog.Viewport>
          <Dialog.Popup initialFocus={false} aria-label="Calculation Report" style={{ '--aui-width': 'min(520px, 100%)' } as React.CSSProperties}>
            <Dialog.Title aui={{ color: 'raised' }}>
              Calculation Report
              <Dialog.Spacer />
              <Tooltip.Provider>
                <Tooltip>
                  <Tooltip.Trigger render={<Dialog.Close aria-label="Close" />} />
                  <Tooltip.Portal container={host}>
                    <Tooltip.Positioner side="top" sideOffset={8}>
                      <Tooltip.Popup aui={{ paint: 'solid', color: 'secondary', scale: 'sm' }}>Close</Tooltip.Popup>
                    </Tooltip.Positioner>
                  </Tooltip.Portal>
                </Tooltip>
              </Tooltip.Provider>
            </Dialog.Title>
            <Dialog.Body aui={{ profile: 'no-padding' }}>
              <View
                role="document"
                aria-label="Calculation report preview"
                aui={{ paint: 'text', profile: 'default', sx: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8', flex: 'fill' } }}
              >
                <Type as="p" role="p1" weight="semi-bold">
                  Report preview for Design 1
                </Type>
                <Type as="p" role="p2">
                  The generated PDF report is shown here.
                </Type>
              </View>
            </Dialog.Body>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog>
  );
}
