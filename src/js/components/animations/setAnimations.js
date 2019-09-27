import animateHeader from './animateHeader';
import animateHero from './animateHero';
import animateSections from './animateSections';

export default function setAnimations() {
  animateHeader()
    .then(animateHero)
    .then(animateSections);
}
