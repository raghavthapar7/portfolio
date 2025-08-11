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
    areButtonsDisabled = true;

    connectedCallback() {
        console.log(`Common Footer loaded`);
        this.setSocialIcons();
    }

    setSocialIcons() {
        this.LinkedIn = socials + '/socials/LinkedIn.png';
        this.Trailhead = socials + '/socials/Trailhead.png';
        this.X = socials + '/socials/X.png';
        this.GitHub = socials + '/socials/Github.png';
    }

    handleRedirection(event) {
        const url = LINKS[event.currentTarget.dataset.target]
        window.open(url, '_blank');
    }

    handleEmailChange(event) {
        const emailInput = event.currentTarget;
        const email = event.currentTarget.value;
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        this.areButtonsDisabled = true;

        let isEmailValid = (pattern.test(email) && (email.endsWith('.com') || email.endsWith('.ai') || email.endsWith('.co.in')) && email.includes('@'));

        emailInput.setCustomValidity('');

        if (!isEmailValid) {
            emailInput.setCustomValidity('Please enter a valid email address to enable the buttons.');
            emailInput.reportValidity();
        }
        else {
            emailInput.reportValidity();
        }


        this.areButtonsDisabled = !isEmailValid;
    }

    redirectToCal() {
        window.open('https://cal.com/raghavthapar', '_blank');
    }

    // mailto:paulie@example.com?subject=I%20love%20SendLayer&body=Hey%20there,%0D%0A%0D%0AI%20wanted%20to%20let%20you%20know%20your%20support%20is%20top%20notch!%0D%0A%0D%0ABest,%0D%0ASatisfied%20customer%20%3A%29
    redirectToMail() {
        const email = "raghavthapar.07@gmail.com";
        const subject = "Portfolio Inquiry";

        const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}}`;
        window.open(mailtoLink, '_blank');
        // window.open('mailto:paulie@example.com?subject=I%20love%20SendLayer&body=Hey%20there,%0D%0A%0D%0AI%20wanted%20to%20let%20you%20know%20your%20support%20is%20top%20notch!%0D%0A%0D%0ABest,%0D%0ASatisfied%20customer%20%3A%29', '_blank');
    }
}