import { LightningElement } from 'lwc';
import socials from '@salesforce/resourceUrl/Socials';

const LINKS = {
    LinkedIn: 'https://www.linkedin.com/in/raghavthapar07',
    Trailhead: 'https://www.salesforce.com/trailblazer/raghavthapar',
    X: 'https://x.com/RaghavThapar7',
    GitHub: 'https://github.com/raghavthapar7',
}

export default class CommonFooter extends LightningElement {

    LinkedIn;
    Trailhead;
    X;
    GitHub;

    connectedCallback() {
        console.log(`Common Footer loaded`);
        this.setSocialIcons();
    }

    setSocialIcons() {
        this.LinkedIn = socials + '/socials/LinkedIn.png';
        this.Trailhead = socials + '/socials/Trailhead.png';
        this.X = socials + '/socials/X.jpg';
        this.GitHub = socials + '/socials/GitHub.png';
    }

    handleRedirection(event) {
        const url = LINKS[event.target.dataset.target]
        window.open(url, '_blank');
    }
}