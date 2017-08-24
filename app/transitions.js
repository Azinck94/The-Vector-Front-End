export default function(){
    this.transition(
      this.fromRoute('sign-up'),
      this.toRoute('sign-in'),
      this.use('toLeft'),
      this.reverse('toRight')
    );
}
