import type { ContextProps } from '../../../../../types';
import { Button, Icon, Menubar, Popover, Type, View } from '../../../../../kit';

// FD AppsPopover (src/App.jsx): the grip button of the top bar opens a 288px popup below it (bottom, end, 8px offset), a View section (scale xs, surface, solid, soft, elevation 4).
// The close X is a Button with an xmark Icon child (not an IconButton), color secondary, paint text, scale sm, in the title row at the end. The grid of app links is left out.
export default function FdAppsCloseScene({ host }: ContextProps) {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', justifyContent: 'end' } }} style={{ minBlockSize: 'calc(var(--p-px-16) * 10)', inlineSize: 'min(100%, calc(var(--p-px-16) * 24))' }}>
      <Menubar aria-label="Top bar">
        <Popover open modal={false}>
          <Popover.Trigger render={<Menubar.IconButton name="grip" aria-label="Apps" />} />
          <Popover.Portal container={host}>
            <Popover.Positioner side="bottom" align="end" sideOffset={8} className="ug-anchored">
              <Popover.Popup
                initialFocus={false}
                aria-label="Explore More Applications"
                style={{ inlineSize: 'min(calc(var(--p-px-16) * 18), 100%)' }}
                render={
                  <View
                    as="section"
                    aui={{ color: 'surface', paint: 'solid', profile: 'default', scale: 'xs', shape: 'soft', elevation: 4, sx: { display: 'flex', flexDirection: 'column', gap: '8' } }}
                  />
                }
              >
                <View aui={{ paint: 'text', sx: { display: 'flex', alignItems: 'center', justifyContent: 'between', gap: '8' } }}>
                  <Type data-ug-part="apps-title" as="h2" role="l3" weight="semi-bold">Explore More Applications</Type>
                  <Button aria-label="Close applications" aui={{ color: 'secondary', paint: 'text', scale: 'sm' }}>
                    <Icon name="xmark" />
                  </Button>
                </View>
              </Popover.Popup>
            </Popover.Positioner>
          </Popover.Portal>
        </Popover>
      </Menubar>
    </View>
  );
}
