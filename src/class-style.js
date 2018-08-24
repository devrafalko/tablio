import './style-classic.scss';
import './style-minimal.scss';
import './style-modern.scss';
import './style-stripes.scss';

export default class Style {
  static get list() {
    return [
      'tablio-modern',
      'tablio-minimal',
      'tablio-stripes',
      'tablio-classic'
    ];
  }
  
  static get defaultStyle(){
    return this.list[0];
  }
}