public without sharing class PortfolioController {
    
    @AuraEnabled(cacheable=true)
    public static List<portfolioWrapper> getExperienceData(){
        List<Experience__c> experiences = 
            [
                SELECT 
                    Id, Name, Organization__c, Organization_Logo__c, Start_Date__c, End_Date__c, 
                    Description__c, Professional_Experience__c , Location__c,
                    (SELECT Skill_Name__c, Skill__r.Skill_Image__c FROM ExperienceSkills__r ORDER BY Skill_Name__c)
                FROM 
                    Experience__c 
                WHERE 
                    Person__c IN (SELECT Id FROM Person__c WHERE Name = 'Raghav Thapar')
                ORDER BY
                    Start_Date__c DESC
            ];

        List<portfolioWrapper> experienceList = new List<portfolioWrapper>();
        
        for(Experience__c experience : experiences){
            experienceList.add(new portfolioWrapper(experience));
        }

        return experienceList;
    }

    public class portfolioWrapper{
        @AuraEnabled public String experienceName{get;set;}
        @AuraEnabled public Id experienceId{get;set;}
        @AuraEnabled public String companyName{get;set;}
        @AuraEnabled public Date startDate{get;set;}
        @AuraEnabled public Date endDate{get;set;}
        @AuraEnabled public Boolean isProfessional{get;set;}
        @AuraEnabled public String description{get;set;}
        @AuraEnabled public List<skillWrapper> skills{get;set;}
        @AuraEnabled public String logo{get;set;}
        @AuraEnabled public String location{get;set;}

        // Wrapper to make it easy to handle data in LWC
        public portfolioWrapper(Experience__c experience){
            this.experienceName = experience.Name;
            this.experienceId = experience.Id;
            this.companyName = experience.Organization__c;
            this.logo = experience.Organization_Logo__c;
            this.startDate = experience.Start_Date__c;
            this.endDate = experience.End_Date__c;
            this.description = experience.Description__c;
            this.isProfessional = experience.Professional_Experience__c;
            this.skills = createSkillSet(experience.ExperienceSkills__r);
            this.location = experience.Location__c;
        }
        
        // Creates a list of string that contains all the skills from the Junction Object
        public List<skillWrapper> createSkillSet(List<ExperienceSkill__c> skillSet){
            List<skillWrapper> skillList = new List<skillWrapper>();
            
            for(ExperienceSkill__c skill: skillSet){
                skillList.add(new skillWrapper(skill));
            }
            
            return skillList;
        }
    }

    public class skillWrapper{
        @AuraEnabled public String skillName{get;set;}
        @AuraEnabled public String skillImage{get;set;}

        public skillWrapper(ExperienceSkill__c skill){
            this.skillName = skill.Skill_Name__c;
            this.skillImage = skill.Skill__r.Skill_Image__c;
        }
    }
}