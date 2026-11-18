import { Switch, View } from '../../../../kit';

// PBS and RWS Show Optimized Models, ACE Send me a copy (src/ResultsSection.tsx, src/rws/output.tsx, src/features/top-navigation/ui/FeedbackDialog.tsx): a labelled Switch with no states, so the default look. PBS and RWS write aui scale "sm" and ACE nothing; scale "sm" renders the same size (44 by 22px). PBS and RWS sit in the table toolbar row (flex, centred, gap 4) with a help trigger, ACE at the end of the feedback form. The scene draws the toolbar row and leaves out the help trigger, the search field and the row count.
export default function PbsLabelledScene() {
  return (
    <View aui={{ paint: 'text', profile: 'no-padding', sx: { display: 'flex', alignItems: 'center', gap: '4' } }}>
      <Switch defaultSelected aui={{ scale: 'sm' }}>
        <Switch.Label>Show Optimized Models</Switch.Label>
      </Switch>
    </View>
  );
}
