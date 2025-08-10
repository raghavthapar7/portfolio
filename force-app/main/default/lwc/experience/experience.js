import { LightningElement, api } from 'lwc';

export default class Experience extends LightningElement {
    @api experiences;
    selectedExperience;

    // Handles change in selected experience when clicked on the logo of the company
    changeSelectedExperience(event) {
        let experienceClickedId = event.currentTarget.dataset.id;
        this.selectedExperience = this.experiences.find(exp => exp.experienceId === experienceClickedId);

        this.transformSelectedExperience(experienceClickedId);
    }

    // Sets up the selected experience when initially rendered
    renderedCallback() {
        if (this.experiences && (this.selectedExperience === null || this.selectedExperience === undefined)) {
            this.selectedExperience = this.experiences[0];
            this.transformSelectedExperience(this.experiences[0].experienceId)
        }
    }

    transformSelectedExperience(experienceId) {
        let exp = this.template.querySelector(`[data-id=${experienceId}]`)

        let allExp = this.template.querySelectorAll('.logo');
        allExp.forEach(xp => {
            if (xp.classList.contains('selected-experience')) {
                xp.classList.remove('selected-experience');
            }
        });

        exp.classList.add('selected-experience');
    }
}