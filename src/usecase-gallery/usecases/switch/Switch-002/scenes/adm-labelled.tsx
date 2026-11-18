import { Switch, View } from '../../../../kit';

// ADM Base plate editor (src/features/viewer/components/EditModals/BasePlateModal.tsx): a labelled Switch in the dialog body with the shared toggle states (TOGGLE_STATE_AUI, src/shared/lib/toggle-appearance.ts): off is a white track with a 1px slate border, on is primary solid. Left out: the dialog frame, the other draft switches and fields.
export default function AdmLabelledScene() {
  return (
    <View aui={{ paint: 'text', sx: { display: 'flex', flexDirection: 'column', gap: '12' } }}>
      <Switch defaultSelected aui={{ states: { unselected: { paint: 'tonal', color: 'surface', sx: { borderColor: 'outlined' } }, selected: { paint: 'solid', color: 'primary' } } }}>
        <Switch.Label>Include base plate</Switch.Label>
      </Switch>
    </View>
  );
}
