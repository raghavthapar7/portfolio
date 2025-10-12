import { LightningElement, wire, track } from 'lwc';
import portfolioImages from '@salesforce/resourceUrl/PortfolioImages';

import getExperienceData from '@salesforce/apex/PortfolioController.getExperienceData';

export default class PortfolioLandingPage extends LightningElement {

    profilePicture;
    underline;
    @track experiences = [];
    mobileView = false;

    @wire(getExperienceData)
    handleData({ data, error }) {
        if (data) {
            console.log(data);
            this.experiences = data;
        }
        else if (error) {
            this.experiences = undefined;
            console.error(error);
        }
    }

    // Loads static resources
    connectedCallback() {
        this.profilePicture = portfolioImages + '/PortfolioImages/heroImage.png';
        this.underline = portfolioImages + '/PortfolioImages/underline.png';
        window.addEventListener('resize', this.displayWindowSize.bind(this));
        this.displayWindowSize();
    }

    displayWindowSize() {
        let width = window.innerWidth;
        if (width < 1024)
            this.mobileView = true;
        else
            this.mobileView = false;
    }


}