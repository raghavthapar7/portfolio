import { LightningElement } from 'lwc';
import resume from '@salesforce/resourceUrl/resume';

export default class CommonHeader extends LightningElement {
    tabs = ['About Me', 'Experience', 'Resume'];
    hamburgerActive = false;

    handleTabClick(event) {
        const target = event.currentTarget.dataset.target;
        console.log(target);

        if (target === 'Resume') {
            let resumeLink = resume;
            window.open(resumeLink, '_blank');
        }
    }

    toggleMenu(event) {
        let hamClasses = event.currentTarget.classList;
        hamClasses.toggle('active');
        this.hamburgerActive = !this.hamburgerActive;
    }
}

