A

Project Report On

**DIAGNOCARE**

By

**Tanisha Lakhlani    CE026       21CEUOG097**

**Isha Paghdal            CE029       21CEUOG125**

**Mann Desai              CE068       21ITUOS019**

**B.Tech CE , Semester VI**

**Subject: System Design Practice**

**Guided by:**

Prof. Jatayu H. Baxi

Assistant Professor

CE Department

![a logo for dharmanh desai university on a white background](/glJ-logo-dharmanh-desai-university-white-background.png)

**Faculty of Technology**

**Department of Computer Engineering**

**Dharmsinh Desai University**

![a logo for dharmanh desai university on a white background](/lU0-logo-dharmanh-desai-university-white-background.png)

**Faculty of Technology**

**Department of Computer Engineering**

**Dharmsinh Desai University**

**CERTIFICATE**

This is to certify that the practical/term work carried out in the subject of** System**

**Design Practice** and recorded in this report is the bonafide work of

                                     **Tanisha Lakhlani   CE026       21CEUOG097**

**Isha Paghdal            CE029       21CEUOG125**

**Mann Desai              CE068       21ITUOS019**

Of B.Tech semester** VI** in the branch of **Computer Engineering** 

during the academic year **2023-2024**.

Prof. Jatayu Baxi,                                                     Dr. C.K. Bhensdadia,

Assistant Professor,                                                Head,

CE Department,                                                       CE Department,

Dharmsinh Desai University, Nadiad.               Dharmsinh Desai University Nadiad.

Table of Contents


| Sr. 
No. | Content  | Page 
No.  |
|---|---|---|
| 1. | Introduction  | 3 |
| 2. | Software Requirement Specification | 4 |
| 3. | Dataset Description | 12 |
| 4. | Implementation | 25 |
| 5. | Evaluation  | 28 |
| 6. | System Screenshots | 32 |
| 7. | Limitation and Future extension | 39 |
| 8. | Bibliography | 41 |

1. Introduction


**1.1 Brief Introduction:**

   DiagnoCare stands at the forefront of revolutionizing healthcare by seamlessly integrating machine learning technology into the diagnostic process. With a focus on empowering both patients and healthcare providers, the platform offers a comprehensive suite of features aimed at streamlining disease detection and management:

- Utilizing advanced algorithms, DiagnoCare enables doctors to efficiently diagnose a range of conditions, including diabetes, lung cancer, brain tumors, and Alzheimer's disease, leveraging both numerical data and MRI images for comprehensive analysis.

- Through secure patient-doctor communication channels, individuals can easily book appointments, share relevant medical documents, and even consult with healthcare professionals via video conferencing, fostering a patient-centric approach to healthcare delivery.

- Doctors benefit from the ability to track patient histories and seamlessly upload diagnostic reports, facilitating continuity of care and informed decision-making.

- With a commitment to enhancing diagnostic accuracy and early intervention, DiagnoCare represents a pivotal advancement in leveraging technology to improve healthcare outcomes and patient experiences.

**1.2 Tools, Technology and Platform used:**

- Programming Languages: Python and React

- Flask Server as backend

- Frontend: React Js

- Video chat API: ZEGOCLOUD

- Payment Gateway: Stripe

- Database: MongoDB

- GitHub:** **Version Control and Collaboration

- MongoDBCompass: Query Visualization

- Postman: API Testing and Development

- Backend Deployment: Hugging Face

- Frontend Deployment: Vercel

2. Software RequirementsSpecifications


**1 Introduction:**

DiagnoCare is a machine learning-powered system designed to assist healthcare professionals in disease diagnosis.

	**1.1 Purpose**

The purpose of this document is to outline the software requirements for the development ofDiagnoCare, an efficient disease diagnosis software. DiagnoCare allows doctors to generate reports, create and track patient history while patients can take precautions accordingly.



**1.2 Project Scope**

- The project scope includes building a comprehensive diagnostic software to assist healthcare professionals (doctors) and patients in the disease diagnosis process

- Doctors can generate reports for a particular patient and can also track history of patients and patients can take precautions accordingly.



**1.3 Environment Characteristics**

- It will mainly interact with the online environment.

- No external hardware interface is required.

**1.4 Definitions, Abbreviations and Acronyms**

- SRS -System Requirements Specification

**2 Overall Description:**

**2.1 Software Perspective**

- A disease diagnosis web application with an intuitive interface, stringent security measures, accurate diagnostic algorithms, and seamless integration with healthcare systems to provide real-time updates

**2.2 Software features**

- User-Friendly Interface:

Intuitive design for easy navigation and use.

- Security Measures:

Authentication and Authorization Methods

- Diagnostic Algorithms:

Accurate and up-to-date algorithms for precise diagnoses.

Integration of machine learning for continuous improvement.

- Integration Capabilities:

Interoperability with existing healthcare systems and EHRs.

APIs for third-party integration.

**2.3 User class and characteristics**

**1 . Healthcare Professionals : ** 

- Characteristics:

Trained medical professionals (doctors, nurses, etc.).

Busy schedules with a need for efficient communication.

Technical proficiency in using medical software.

- Needs:

Integration with existing healthcare systems.

Collaboration tools for communication with patients.

Quick access to patient data for informed decision-making.

Keep track of patient?s data and report report generation

**2 . Patients: ** 

- Characteristics:

Often experiencing health concerns or symptoms prompting the need for medical attention.

- Needs:

Easy and intuitive interface for booking appointments and submitting medical documents.

Clear and concise information regarding medical procedures, diagnoses, and treatment options.

Accessible communication channels with healthcare professionals for inquiries and consultations.

**2.4 Operating environment**

It can be run on any hardware platform regardless of the operating system.

**2.5 Design and implementation constraint**

- MongoDB

- React

- Spring Boot

**2.6 User Documentation**

Not Applicable

**2.7 Assumptions and dependencies**

- There is only one administrator

- Each registered user must have an email id and a password

- Internet connection

- Proper browser support

**3 External Interface Requirements:**

 **3.1 User Interface **

Screen is as per the UI design of the given sample screen.

**3.2 Hardware Interface**

Not Applicable

**3.3 Software Interface**

- MongoDB for database storage.

- Spring Boot and Hibernate for Model integration and maintaining patient?s data

- React.js for the front-end user interface.

- Spring Security for authentication and authorization of users

**4 System Features:**

**R1 : Register user**

Description:  Users will enter their details and will be able to register themselves.

- R1.1 : selects Register

Input : User will select register option

Output : user will be prompted with to enter the details

- R1.2 : register user

Input : user will enter his/her detail

Output : user will be registered and will be redirected to login

page.



**R2 : Login to System**

Description: User will enter the credentials and will be able to login

- R2.1 : selects login

Input : User will enter credentials

Output : Users will be prompted to enter their credentials.

- R2.2: login user

Input : user enters credentials

Output : user will be logged in to the system and will be redirected to the home

page.

**Doctor:**

**R3 : Profile details**

Description: Doctor can add or update his/her profile details(name, email, qualifications, experiences, available time slots, bio etc.).



*                      *  Input:* *Profile details

*                        *Output: Doctor?s profile will be displayed on the screen.



**R4 : Add Patient**

Description: Doctor will add patient by providing patient details(name, phone number, address).

Input: Patient details.

Output: Newly added patient will be displayed on doctor?s dashboard

**R5 :Patient appointment request**

Description: Patients? appointment requests for a particular doctor will be displayed on the doctor's dashboard.

Input: Select ?Appointments? section

Output: Patients? requests will be displayed

**R6 :  Accurate Disease Diagnosis**

Description: Accurate Disease detection and extent/level of disease will be displayed.

Input: Text document or Image 

Output: Prediction returned by the model will be displayed along with                                                                                                   R                                      Recommendations, symptoms and treatment.



**R7 : Generate patient report**

Description: The Software will generate a patient's report and can download reports as well.

Input: Select ?Generate Report? option.

Output: Patient?s report will be generated in a pdf format.

**R8 : Save patient history**

Description: Users of software can maintain a patient's history and can  change any details as well. Moreover, User can also compare the patient's current and previous Data.

 Input: Select ?Upload? option

Output: Generated report will be uploaded in the particular patient?s dashboard and pdf will get downloaded on the doctor's machine.

**Patient :**

**R9 : View doctor?s  details**

Description: Patients can view currently available doctors with their details(name, price, specialization, education, available time slots etc.).



Input:  Select ?Doctor details? option

Output: Doctor?s details will be displayed.

**R10 : Book appointment**

Description: Patient can book an appointment for video chat via sending request through mail to the doctor and once appointment is fixed, patient can make payment.



       ** R10.1: Send appointment request**

Input: Select ?Book appointment? option

Output: One appointment request for the current patient will be sent to the selected doctor.

****

**R10.2: Make payment**

** **Input: Select ?Make payment? option

Output: Payment status will change to ?paid? on the doctor's dashboard.



**R11 : Take consultation via video chat**

Description: Patients can take video consultation from the doctor after their appointment is fixed for a particular time slot.

Input: Select ?Start Consultation? option

Output: Both doctor and patient can now do video chat, after which one    kmkl      report will be sent to the patient via mail from the doctor.

**5 Other non functional requirements:**

**5.1 Performance Requirements**

- It is required that the website runs smoothly and fast to get faster access to it. The performance of the website depends upon web server speed and upon network speed. This is web based therefore it also depends upon internet speed.

- We will make such a website that will perform well in all situations like low speed network as well as high speed.

**5.2 Safety Requirements**

- Database access permitted to only Database Administrator.

- Use of secure servers.

- Backup in case of a software crash.

- Payment is handled through secure gateways.

**5.3 Security Requirements**

- Login activity

- Data integrity checks

 **5.4 Software Quality Attributes**

- The source code of  the request  is not going to be open source. It will not be free for further modifications and improvements.

**5.5 Business Rules**

- Illegal duplication of the project and interface is strictly to be dealt with.

 3. Dataset Description


- **Diabetes**

# 1) Pima Indians Diabetes Database:

**Source: **Kaggle

**Link:**

[https://www.kaggle.com/datasets/uciml/pima-indians-diabetes-database](https://www.kaggle.com/datasets/uciml/pima-indians-diabetes-database)

**Size:**

This dataset is consist of **9** columns and **769** rows

**Predictor variables:**

**Pregnancies **- Number of times pregnant

**Glucose **- Plasma glucose concentration a 2 hours in an oral glucose tolerance test

**BloodPressure **- Diastolic blood pressure (mm Hg)

**SkinThickness **- Triceps skinfold thickness (mm)

**Insulin **- 2-Hour serum insulin (mu U/ml)

**BMI** - Body mass index (weight in kg/(height in m)^2)

**Diabetes pedigree** - Diabetes pedigree function

**Age **- Age (years)

**Target (Dependent) variable:**

**Outcome **- Class variable (0 or 1) 268 of 768 are 1, the others are 0

![](/jf2_Image_3.png)

**Fig. 3.1: ****Pima Indians Diabetes Database**

# 2) Diabetes Health Indicators Dataset:

**Source: **Kaggle

**Link:**

** **[https://www.kaggle.com/datasets/alexteboul/diabetes-health-indicators-dataset/](https://www.kaggle.com/datasets/alexteboul/diabetes-health-indicators-dataset/)

**Size:**

This dataset is consist of  **21** columns and **253681** rows

**Predictor variables:**

**HighBP - ** 0 = no high BP 1 = high BP

**HighChol - **0 = no high cholesterol 1 = high cholesterol

**CholCheck -  **0** **= no cholesterol check in 5 years 1 = yes cholesterol check in 5 years

**BMI **-  Body Mass Index

**Smoker** -  Have you smoked at least 100 cigarettes in your entire life? [Note: 5 packs = 100 cigarettes] 0 = no 1 = yes

**Stroke** - (Ever told) you had a stroke. 0 = no 1 = yes

**HeartDiseaseorAttack **- coronary heart disease (CHD) or myocardial infarction (MI) 0 = no 1 = yes

**PhysActivity** -  physical activity in past 30 days - not including job 0 = no 1 = yes

**HeavyAlcoholConsumption** - Heavy drinkers (adult men having more than 14 drinks per week and adult women having more than 7 drinks per week) 0 = no 

AnyHealthcare - Have any kind of health care coverage, including health insurance, prepaid plans such as HMO, etc. 0 = no 1 = yes

**GenHlth **- Would you say that in general your health is: scale 1-5 1 = excellent 2 = very good 3 = good 4 = fair 5 = poor

**MentHlth** - Now thinking about your mental health, which includes stress, depression, and problems with emotions, for how many days during the past 30 days was your mental health not good? scale 1-30 days 

**PhysHlth** -  Now thinking about your physical health, which includes physical illness and injury, for how many days during the past 30 days was your physical health not good? scale 1-30 days

**DiffWalk **- Do you have serious difficulty walking or climbing stairs? 0 = no 1 = yes

**Sex **-  0 = female 1 = male

**Age** - 13-level age category (_AGEG5YR see codebook) 1 = 18-24 9 = 60-64 13 = 80 or older           

**Target (Dependent) variable:**

**Diabetes_012** -  0 = no diabetes 1 = pre diabetes 2 = diabetes

![](/RV8_Image_4.png)

**Fig. 3.2: ****Diabetes Health Indicators**** ****Database**

- **Brain Tumor**

# 1) Brain Tumor:

**Source: **Kaggle

**Link:**

[https://www.kaggle.com/datasets/jakeshbohaju/brain-tumor](https://www.kaggle.com/datasets/jakeshbohaju/brain-tumor)

**Size:**

This dataset is consist of **3764 **image files 

**Predictor variables:**

**Image **- Image name

**Mean **- First order feature mean

**Variance** - First order feature variance

**Standard Deviation** - First order feature std deviation

**Entropy** - Second order feature entropy

**Skewness** - First order feature skewness

**Kurtosis** - First order feature kurtosis

**Contrast** - Second order feature contrast

**Energy** - Second order feature energy

**Target (Dependent) variable:**

**Class **- Target value Tumor = 1 Non tumor =0

![](/vN3_Image_10.jpeg)

**Fig. 3.3: ****Brain Tumor Dataset MRI samples**

# 2) Brain Tumor MRI Dataset

**Source: **Kaggle

**Link:**

** **[https://www.kaggle.com/datasets/masoudnickparvar/brain-tumor-mri-dataset](https://www.kaggle.com/datasets/masoudnickparvar/brain-tumor-mri-dataset)

**Size:**

This dataset is consist of  **7022 **image files

Human brain MRI images are classified into 4 classes:

1. **Glioma** 

2. **Meningioma** 

3. **No tumor** 

4. **Pituitary**

Glioma:

![](/mdx_Image_11.png)
![](/kxP_Image_12.png)
![](/oPN_Image_13.png)

**Fig. 3.4: ****Brain Tumor MRI Dataset ****Glioma Samples**

Meningioma:

![](/Mfx_Image_14.png)
![](/Mvg_Image_16.png)

**Fig. 3.5: ****Brain Tumor MRI Dataset ****Meningioma Samples**

No tumor :

![](/qcN_Image_19.png)

**Fig. 3.6: ****Brain Tumor MRI Dataset ****No tumor Samples**

Pituitary:

![](/xQk_Image_22.png)

**Fig. 3.7: ****Brain Tumor MRI Dataset ****Pituitary** **Samples**

3. **Lung Cancer**

# 1) Lung Cancer Prediction:

**Source: **Kaggle

**Link:**

[https://www.kaggle.com/datasets/thedevastator/cancer-patients-and-air-pollution-a-new-link](https://www.kaggle.com/datasets/thedevastator/cancer-patients-and-air-pollution-a-new-link)

**Size:**

This dataset is consist of **26** columns and **1000** rows

**Predictor variables:**

**Patient Id - **Patient Id

**Age - **The age of the patient. (Numeric)

**Gender - **The gender of the patient. (Categorical)

**Air Pollution - **The level of air pollution exposure of the patient. (Categorical)

**Alcohol use - **The level of alcohol use of the patient. (Categorical)

**Dust Allergy - **The level of dust allergy of the patient. (Categorical)

**OccuPational Hazards - **The level of occupational hazards of the patient. (Categorical)

**Genetic Risk -** The level of genetic risk of the patient. (Categorical)

**Target (Dependent) variable:**

**Chronic Lung Disease - **The level of chronic lung disease of the patient. (Categorical)

![](/N3R_Image_23.png)

**Fig. 3.8: **** ****Lung Cancer Prediction**** ****Database**

# 2) Survey Lung Cancer:

**Source: **Kaggle

**Link:**

[https://www.kaggle.com/code/sandragracenelson/lung-cancer-prediction/input](https://www.kaggle.com/code/sandragracenelson/lung-cancer-prediction/input)

**Size:**

This dataset is consist of  **16** columns and **284 **rows

**Predictor variables:**

**Gender -** M(male), F(female)

**Age - **Patient Age

**Smoking - **YES=2 , NO=1

**Yellow_Fingers - **YES=2 , NO=1

**Anxiety - **YES=2 , NO=1

**Chronic Disease - **YES=2 , NO=1

**Fatigue - **YES=2 , NO=1

**Allergy - **YES=2 , NO=1

**Wheezing - **YES=2 , NO=1

**Alcohol Consuming - **YES=2 , NO=1

**Shortness Of Breath -** YES=2 , NO=1

**Chest Pain - **YES=2 , NO=1

**Target (Dependent) variable:**

**Lung_Cancer -** YES=2 , NO=1

![](/R9i_Image_24.png)

**Fig. 3.9: **** ****Survey Lung Cancer**** ****Database**

4. **Alzheimer**

# 1) Alzheimer_s Dataset:

**Source: **Kaggle

**Link:**

[https://www.kaggle.com/code/amyjang/alzheimer-mri-model-tensorflow-2-3-data-loading/input](https://www.kaggle.com/code/amyjang/alzheimer-mri-model-tensorflow-2-3-data-loading/input)

**Size:**

This dataset is consist of **5000 **image files 

**Classes:**

1. MildDemented

2. VeryMildDemented

3. NonDemented

4. ModerateDemented

MildDemented

![](/6z8_Image_27.png)

**Fig. 3.10: ****Alzheimer_s Dataset ****MildDemented ****Samples**

ModerateDemented

![](/AWE_Image_30.png)

**Fig. 3.11: ****Alzheimer_s Dataset ****ModerateDemented** **Samples**

NonDemented

![](/XYz_Image_31.png)
![](/5zA_Image_32.png)
![](/Ql9_Image_33.png)

**Fig. 3.12: ****Alzheimer_s Dataset ****NonDemented** **Samples**

VeryMildDemented

![](/Qkd_Image_36.png)

**Fig. 3.13: ****Alzheimer_s Dataset ****VeryMildDemented** **Samples**

# 2) Augmented Alzheimer MRI Dataset:

**Source: **Kaggle

**Link:**

[https://www.kaggle.com/datasets/uraninjo/augmented-alzheimer-mri-dataset](https://www.kaggle.com/datasets/uraninjo/augmented-alzheimer-mri-dataset)

**Size:**

This dataset is consist of  **40.4K **image files

**Classes:**

1. MildDemented

2. VeryMildDemented

3. NonDemented

4. ModerateDemented

MildDemented

![](/pVw_Image_37.png)
![](/BbE_Image_38.png)
![](/SmM_Image_39.png)

**Fig. 3.14: ****Augmented Alzheimer MRI Dataset ****MildDemented ****Samples**

ModerateDemented

![](/pKD_Image_42.png)

**Fig. 3.15: ****Augmented Alzheimer MRI Dataset ****ModerateDemented** **Samples**

NonDemented

![](/bgq_Image_45.png)

**Fig. 3.16: ****Augmented Alzheimer MRI Dataset ****NonDemented** **Samples**

VeryMildDemented

![](/sAm_Image_48.png)

**Fig. 3.17: ****Augmented Alzheimer MRI Dataset ****VeryMildDemented** **Samples**

  4. Implementation Details 



2. **4.1 Libraries and Frameworks:**

- Python Libraries: Utilized various Python libraries including NumPy, pandas, scikit-learn, Keras (with TensorFlow backend), Matplotlib, Seaborn, etc., for data manipulation, visualization, and model building.

- Machine Learning: Employed scikit-learn library for building traditional machine learning models such as Random Forest, Naive Bayes, and KNN.

- Deep Learning: Utilized Keras framework with TensorFlow backend for implementing Convolutional Neural Networks (CNNs) for image classification tasks.

- **4.2 Environment:**

- Google Colab: Used Google Colab for writing and executing Python code in a cloud-based environment with access to GPU resources for faster training of deep learning models.

- Local Environment: Additionally, the code can be run in a local Python environment with necessary libraries installed.

- **4.3 Data Preprocessing:**

- Handled missing values using techniques such as mean imputation and KNN imputation.

- Conducted exploratory data analysis (EDA) to understand data distributions, correlations, and patterns.

- Applied feature engineering techniques to select relevant features and remove redundant or highly correlated features.

- **4.4 Model Development:**

- Developed machine learning models such as SVM, Random Forest, Naive Bayes, and KNN for health indicators datasets.

- Implemented Convolutional Neural Networks (CNNs) for image classification tasks related to Alzheimer's disease and brain tumors.

- Utilized appropriate evaluation metrics such as accuracy, precision, recall, and F1-score to assess model performance.

- **4.5 Model Evaluation:**

- Utilized train-test split or cross-validation techniques to evaluate model performance.

- Visualized evaluation metrics using plots such as confusion matrices, ROC curves, and learning curves to analyze model performance.

- **4.6 Model Deployment:**

- Saved trained models using pickle (for machine learning models) and HDF5 format (for deep learning models) for future use or deployment.

- Provided code snippets for loading and using trained models for making predictions on new data.

**4.7 Flask Server as Backend**

**           **The Project is developed using python language. Functionalities involving ML and DL are done using Python. So we were required to access app endpoints using React. So Flask is used as a backend server from where the functionalities are exposed through URL.Data transfer is done using JSON.

![](/BzU_Image_49.png)

**Fig. 4.1: Project Architecture**

**4.8 ****Modules :**

- **Auth:** User registration and authentication 

- **Doctor:** To store doctor details

- **Patient:** To store patient details

- **Appointment:** To store patient appointment related details

- **Diabetes:** To store data of a particular patient  provided by doctor, in order to diagnose diabetes 

- **LungCancer:** To store data of a particular patient  provided by doctor, in order to diagnose lung cancer

- **Store:** To store reports in pdf format

 5. Evaluation 


1. **Accuracy:** 

2. Accuracy measures the proportion of correctly classified instances among all instances. It's calculated as the ratio of correctly predicted instances to the total number of instances.

![](/zAW_Image_50.png)

3. **Precision:** 

4. Precision measures the proportion of true positive instances among all instances predicted as positive. It focuses on the accuracy of positive predictions.

![](/eGU_Image_51.png)

5. **Recall (Sensitivity):** 

6. Recall measures the proportion of true positive instances that were correctly identified. It focuses on the ability of the model to capture all positive instances.

![](/pQU_Image_52.png)

7. **F1 Score:**

8. The F1 score is the harmonic mean of precision and recall. It provides a balance between precision and recall, especially in cases where the class distribution is imbalanced.

![](/DdB_Image_53.png)

**5.1 Evaluation ****Metrics:**

**Diabetes:**

| Model |       Accuracy |       Precision | Recall |      F1 Score |
|---|---|---|---|---|
| Random Forest | 0.8417 | 0.4464 | 0.3872 | 0.3965 |
|       Naive Bayes | 0.7535 | 0.4201 | 0.4612 | 0.4277 |
|             KNN | 0.8511 | 0.4868 | 0.3766 | 0.3837 |

**Table 5.1: Evaluation Metrics of Diabetes**

**Lung Cancer:**

|             Model |       Accuracy |     Precision |             Recall |             F1 Score |
|---|---|---|---|---|
|             SVM |             0.94 |             0.9406 |             0.9334 |             0.9350 |
| R        Random Forest |             1.0 |             1.0 |             1.0 |             1.0 |
|     Naive Bayes |             0.91 |             0.9025 |             0.9026 |             0.9024 |
|            KNN |             0.915 |             0.9086 |             0.9116 |             0.9097 |

**Table 5.2: Evaluation Metrics of Lung Cancer**

**Brain Tumor:**

Accuracy:

![](/43j_Image_54.png)

** ****Fig. 5.1: Accuracy graph of CNN for Brain Tumor**

Loss:

![](/wDy_Image_55.png)

** ****Fig. 5.2: Loss graph of CNN for Brain Tumor**

**Alzheimer:**

Accuracy:

![](/l7O_Image_56.png)

** ****Fig. 5.3: Accuracy graph of CNN for Alzheimer**

Loss:

![](/Hup_Image_57.png)

8. ** ****Fig. 5.4: Loss graph of CNN for Alzheimer**

9. 6. System Screenshots




**Authentication page:**

![](/TV8_Image_58.png)

12. **Fig. 6.1: Login Screen**

**Doctor?s Side Pages****:**

![](/NPq_Image_59.png)

13. **Fig. 6.2: Home Screen**

![](/Ay3_Image_60.png)

15. **Fig. 6.3: Diagnosing Brain Tumor Screen**

![](/UmB_Image_61.png)

17. **Fig. 6.4: Display patients? list Screen**


![](/izT_Image_62.png)


20. **Fig. 6.5: Raw report generated by doctor**

![](/0Dn_Image_63.png)

21. **Fig. 6.6: Downloaded report by doctor in pdf format**

**Patient?s Side Pages****:**

![](/UZT_Image_64.png)

22. **Fig. 6.7: Our Services screen**

![](/nAB_Image_65.png)

23. **Fig. 6.7: Find different doctors screen**


![](/C5e_Image_66.png)

25. **Fig. 6.8: Doctor details screen of a particular doctor**

![](/pgf_Image_67.png)

26. **Fig. 6.9: Join meeting for online video consultation screen**

![](/HG1_Image_68.png)

27. **Fig. 6.10: Video consultation screen**

![](/pU7_Image_69.png)

28. **Fig. 6.10: Make payment screen**

29. 7. Limitation and Future extension




### **7.1 Limitations:**

1. **Data Quality and Quantity:**

- Limited availability of high-quality medical images may affect the model's ability to generalize to diverse cases.

- Class imbalance in the dataset may lead to biased model predictions, especially for rare conditions.

- **Model Complexity:**

- The CNN models implemented may be relatively complex, requiring significant computational resources for training and inference.

- Complexity may lead to longer training times and increased risk of overfitting, particularly with limited data.

- **Interpretability:**

- CNN models often lack interpretability, making it challenging to understand the features contributing to their predictions.

- Lack of interpretability may limit the model's usability in clinical settings where interpretability and transparency are crucial.

### **7.2 Future Extensions:**

**Multi-Modal Fusion:**

- Incorporate additional modalities such as patient demographics, clinical history, or genetic data into the classification models to improve diagnostic accuracy and provide more comprehensive assessments.

**Attention Mechanisms:**

- Integrate attention mechanisms into the CNN architecture to focus on relevant image regions and enhance model interpretability.

**Cross-Regional Multilingual Report:**

- We will provide flexibility to the user to read reports in their regional language.

8. Bibliography


- MongoDB Official Documentation - Documentation on MongoDB, including

installation, configuration, and usage: [https://docs.mongodb.com](https://docs.mongodb.com)

- React Official Documentation - Comprehensive documentation on React:

[https://reactjs.org](https://reactjs.org) 

- Udemy - Machine Learning A-Z course for ML and DL:

[https://www.udemy.com/course/machinelearning/?couponCode=KEEPLEARNING](https://www.udemy.com/course/machinelearning/?couponCode=KEEPLEARNING)

- Backend Deployment : [https://huggingface.co/docs](https://huggingface.co/docs)<span style="text - decoration: underline;"> \
</span>

- Frontend Deployment : [https://vercel.com/docs](https://vercel.com/docs)

- ZegoCloud : [https://www.zegocloud.com/docs](https://www.zegocloud.com/docs)

- Stripe : [https://docs.stripe.com/](https://docs.stripe.com/)
