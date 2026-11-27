import { defineUsecase } from '../../../define';

export default defineUsecase({
  uiType: 'Single button',
  title: 'Show all products button',

options: [
    { id: "default", name: "Inline link", contextAnatomy: [
      { id: "notice", name: "No output results notice", description: "The tonal warning status with the triangle icon and the \"No Output Results\" heading." , lesson: {"explanation":"Tonal warning pairs triangle icon with No Output Results heading.","selector":"[data-ug-part=\"notice\"]","scope":"context"}},
      { id: "try-list", name: "Suggestions list", description: "The \"You can try:\" bulleted list whose list item holds the inline All Products button." , lesson: {"explanation":"Try list contains an inline All Products action.","selector":"[data-ug-part=\"try-list\"]","scope":"context"}},
    ] ,
    },
  ],
  apps: ['hcs'],
  source: { hcs: 'src/components/HcsNoOutputResults.tsx' },
  summary: 'A Button styled as an underlined warning-colored link inside body copy.',
  where: 'Sentences of body text where an action reads as a link: All Products, Form. Real site source: HCS. Built from src/components/HcsNoOutputResults.tsx.',
  when: 'Use it for an action, not navigation, that belongs inside a sentence. For real navigation use a link. The real site underlines a phone link in the default color, so the two differ.',
  how: 'Set aui scale "sm", profile "no-padding", color "warning" and paint "text", plus sx display "inline-flex" and textDecoration "underline". Set type="button". '
    + 'In context the example is the end of the second bullet of "You can try:" in the No Output Results warning card (tonal warning View, triangle icon, heading, bulleted list with disc markers); the app adds a one-line explanation and a Need help paragraph with a second inline button (Form), left out here. '
    + 'In the app the card is sticky inside the table scroll area; here it stands alone.',
  anatomy: [
    {
      id: "container",
      name: "Container",
      description: "The inline \"All Products\" Button inside a sentence: profile \"no-padding\" removes the box, inline-flex and an underline make it read as a warning-colored link; type=\"button\" keeps it from submitting.",
      selector: "[class~=\"aui-button\"]",
     lesson: {"explanation":"Underlined All Products link appears inline and does not submit the form."}},
    {
      id: "label",
      name: "Label",
      description: "The underlined words \"All Products\" that sit in the middle of the sentence \"Selecting … to review all solutions\".",
      selector: "[class~=\"aui-button\"]",
      text: true,
    },
  ],
});
