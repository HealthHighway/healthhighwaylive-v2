import React from 'react';
import {View, Text, Image, TouchableNativeFeedback, ActivityIndicator, Dimensions, TouchableWithoutFeedback, ScrollView, BackHandler} from 'react-native';
import BackHeader from '../../components/atoms/BackHeader';
import { scale } from '../../theme/metric';

class TncScreen extends React.Component {

    render() {
        return(
            <View style={{flex:1, backgroundColor: 'white'}} >
                <View style={{height:scale(40),backgroundColor:'white', flexDirection:'row',paddingHorizontal:scale(20)}} >
                    <BackHeader 
                        onBackPress={() => {
                            this.props.navigation.navigate("Profile")
                        }} 
                        showBackBtn={true} />
                </View>
                <View style={{height:scale(15), backgroundColor : "white"}} />
                <ScrollView style={{backgroundColor:'white', paddingHorizontal:scale(20)}}>
                    <Text allowFontScaling={false} style={{fontSize:scale(20), fontWeight:"bold", fontFamily:'Montserrat-Semibold' }} >1. NATURE AND APPLICABILITY OF TERMS</Text>
                    
                    <Text allowFontScaling={false} style={{fontSize:scale(16), fontFamily:'Montserrat-Regular', marginVertical:scale(20)}} >• Please carefully go through these terms and conditions (“Terms”) and the privacy policy available at http://www.healthhighway.co.in/ (“Privacy Policy”) before you decide to access the Website or avail the services made available on the Website by Health Highway Private Limited. These Terms and the Privacy Policy together constitute a legal agreement (“Agreement”) between you and Health Highway Private Limited in connection with your visit to the Website and your use of the Services (as defined below).</Text>
                    <Text allowFontScaling={false} style={{fontSize:scale(16), fontFamily:'Montserrat-Regular', marginVertical:scale(20)}} >• The Agreement applies to you whether you are -

A Yoga teacher or Yoga service Provider (whether an individual professional or an organization) or similar institution wishing to be listed, or already listed, on the Website, including designated, authorized associates of such practitioners or institutions (“Practitioner(s)”, “you” or “User”);

A user, his/her representatives or affiliates, searching for Practitioners through the Website (“End-User”, “you” or “User”); or

Otherwise a user of the Website (“you” or “User”).</Text>
                    <Text allowFontScaling={false} style={{fontSize:scale(16), fontFamily:'Montserrat-Regular', marginVertical:scale(20)}} >•This Agreement applies to those services made available by Health Highway Private Limited on the Website, which are offered free of charge to the Users (“Services”), including the following:

For Practitioners: Listing of Practitioners and their profiles and contact details, to be made available to the other Users and visitors to the Website;

For other Users: Facility to (i) create and maintain ‘Health Accounts’, (ii) search for Practitioners by name, specialty, and geographical area, or any other criteria that may be developed and made available by Health Highway Private Limited, and (iii) to make appointments with Practitioners. </Text>
                    <Text allowFontScaling={false} style={{fontSize:scale(16), fontFamily:'Montserrat-Regular', marginVertical:scale(20)}} >• The Services may change from time to time, at the sole discretion of Health Highway Private Limited, and the Agreement will apply to your visit to and your use of the Website to avail the Service, as well as to all information provided by you on the Website at any given point in time</Text>
                    <Text allowFontScaling={false} style={{fontSize:scale(16), fontFamily:'Montserrat-Regular', marginVertical:scale(20)}} >• This Agreement defines the terms and conditions under which you are allowed to use the Website and describes the manner in which we shall treat your account while you are registered as a member with us. If you have any questions about any part of the agreement, feel free to contact us at healthhighway2020@gmail.com.</Text>
                    <Text allowFontScaling={false} style={{fontSize:scale(16), fontFamily:'Montserrat-Regular', marginVertical:scale(20)}} >• By downloading or accessing the Website to use the Services, you irrevocably accept all the conditions stipulated in this Agreement and (website Privacy Policy link), as available on the Website, and agree to abide by them. This Agreement supersedes all previous oral and written terms and conditions (if any) communicated to you relating to your use of the Website to avail the Services. By availing any Service, you signify your acceptance of the terms of this Agreement.</Text>
                    <Text allowFontScaling={false} style={{fontSize:scale(16), fontFamily:'Montserrat-Regular', marginVertical:scale(20)}} >• We reserve the right to modify or terminate any portion of the Agreement for any reason and at any time, and such modifications shall be informed to you in writing. You should read the Agreement at regular intervals. Your use of the Website following any such modification constitutes your agreement to follow and be bound by the Agreement so modified.</Text>
                    <Text allowFontScaling={false} style={{fontSize:scale(16), fontFamily:'Montserrat-Regular', marginVertical:scale(20)}} >• You acknowledge that you will be bound by this Agreement for availing any of the Services offered by us. If you do not agree with any part of the Agreement, please do not use the Website or avail any Services.</Text>
                    <Text allowFontScaling={false} style={{fontSize:scale(16), fontFamily:'Montserrat-Regular', marginVertical:scale(20)}} >• Your access to use of the Website and the Services will be solely at the discretion of Health Highway Private Limited.</Text>
                    <Text allowFontScaling={false} style={{fontSize:scale(16), fontFamily:'Montserrat-Regular', marginVertical:scale(20)}} >• The Agreement is published in compliance of, and is governed by the provisions of Indian law, including but not limited to:

the Indian Contract Act, 1872,

the (Indian) Information Technology Act, 2000, and

the rules, regulations, guidelines and clarifications framed there under, including the (Indian) Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Information) Rules, 2011 (the “SPI Rules”), and the (Indian) Information Technology (Intermediaries Guidelines) Rules, 2011 (the “IG Rules”).</Text>

                    {/* <Text allowFontScaling={false} style={{fontSize:scale(16), fontFamily:'OpenSans-Regular', marginVertical:scale(20) }} >We at Health Highway Private Limited ('Health Highway’', 'We', 'Us', 'Our') know that you as a user ('You', 'Your', ‘User(s)’) care about how your personal information is used and shared, and we take your privacy seriously. Please read the following to learn more about our privacy policy. By visiting or using our website (website link) and domain name, and any other linked pages, features, content, mobile applications, or any other services we offer from time to time by in connection therewith (collectively, the 'Mobile App'), or by using the Services / Products (as defined in our link to terms of use) in any manner, you acknowledge that you accept the practices and policies outlined in this privacy policy, and you hereby consent that we will collect, use, and share your information in the following ways.</Text> */}

                    <Text allowFontScaling={false} style={{fontSize:scale(20), fontWeight:"bold", fontFamily:'Montserrat-Semibold' }} >2. CONDITIONS OF USE</Text>
                    <Text allowFontScaling={false} style={{fontSize:scale(16), fontFamily:'OpenSans-Regular', marginVertical:scale(20) }} >You must be 18 years of age or older to register, use the Services, or visit or use the Website in any manner. By registering, visiting and using the Website or accepting this Agreement, you represent and warrant to Health Highway Private Limited that you are 18 years of age or older, and that you have the right, authority and capacity to use the Website and the Services available through the Website, and agree to and abide by this Agreement</Text>

                    <Text allowFontScaling={false} style={{fontSize:scale(20), fontWeight:"bold", fontFamily:'Montserrat-Semibold' }} >3. TERMS OF USE APPLICABLE TO ALL USERS</Text>
                    <Text allowFontScaling={false} style={{fontSize:scale(16), fontFamily:'OpenSans-Regular', marginVertical:scale(20) }} >The terms in this Clause 3 are applicable only to Users other than Practitioners.</Text>

                    <Text allowFontScaling={false} style={{fontSize:scale(20), fontWeight:"bold", fontFamily:'Montserrat-Semibold' }} >3.1END-USER ACCOUNT AND DATA PRIVACY</Text>
                        <Text allowFontScaling={false} style={{fontSize:scale(16), fontFamily:'Montserrat-Regular', marginVertical:scale(20)}} >• 3.1.1 Health Highway Private Limited may by its Services, collect information relating to the devices through which you access the Website, and anonymous data of your usage. The collected information will be used only for improving the quality of Health Highway Private Limited’s services and to build new services.</Text>
                        <Text allowFontScaling={false} style={{fontSize:scale(16), fontFamily:'Montserrat-Regular', marginVertical:scale(20)}} >• 3.1.2 The Website allows Health Highway Private Limited to have access to registered Users’ personal email or phone number, for communication purposes so as to provide you a better way of booking appointments and for obtaining feedback in relation to the Practitioners and their practice.</Text>
                        <Text allowFontScaling={false} style={{fontSize:scale(16), fontFamily:'Montserrat-Regular', marginVertical:scale(20)}} >• 3.1.3 The Privacy Policy sets out, inter-alia:

The type of information collected from Users, including sensitive personal data or information;

The purpose, means and modes of usage of such information;

How and to whom Health Highway Private Limited will disclose such information; and,

Other information mandated by the SPI Rules.</Text>
                        <Text allowFontScaling={false} style={{fontSize:scale(16), fontFamily:'Montserrat-Regular', marginVertical:scale(20)}} >• 3.1.4 The User is expected to read and understand the Privacy Policy, so as to ensure that he or she has the knowledge of, inter-alia:

the fact that certain information is being collected;

the purpose for which the information is being collected;

the intended recipients of the information;

the nature of collection and retention of the information; and

the name and address of the agency that is collecting the information and the agency that will retain the information; and

the various rights available to such Users in respect of such information.</Text>
                        <Text allowFontScaling={false} style={{fontSize:scale(16), fontFamily:'Montserrat-Regular', marginVertical:scale(20)}} >• 3.1.5 Health Highway Private Limited shall not be responsible in any manner for the authenticity of the personal information or sensitive personal data or information supplied by the User to Health Highway Private Limited or to any other person acting on behalf of Health Highway Private Limited.</Text>
                        <Text allowFontScaling={false} style={{fontSize:scale(16), fontFamily:'Montserrat-Regular', marginVertical:scale(20)}} >• 3.1.6 The User is responsible for maintaining the confidentiality of the User’s account access information and password, if the User is registered on the Website. The User shall be responsible for all usage of the User’s account and password, whether or not authorized by the User. The User shall immediately notify Health Highway Private Limited of any actual or suspected unauthorized use of the User’s account or password. Although Health Highway Private Limited will not be liable for your losses caused by any unauthorized use of your account, you may be liable for the losses of Health Highway Private Limited or such other parties as the case may be, due to any unauthorized use of your account.</Text>
                        <Text allowFontScaling={false} style={{fontSize:scale(16), fontFamily:'Montserrat-Regular', marginVertical:scale(20)}} >• 3.1.7 If a User provides any information that is untrue, inaccurate, not current or incomplete (or becomes untrue, inaccurate, not current or incomplete), or Health Highway Private Limited has reasonable grounds to suspect that such information is untrue, inaccurate, not current or incomplete, Health Highway Private Limited has the right to discontinue the Services to the User at its sole discretion.</Text>
                        <Text allowFontScaling={false} style={{fontSize:scale(16), fontFamily:'Montserrat-Regular', marginVertical:scale(20)}} >• 3.1.8 Health Highway Private Limited may use such information collected from the Users from time to time for the purposes of debugging customer support related issues.</Text>
                    {/* <Text allowFontScaling={false} style={{fontSize:scale(16), fontFamily:'OpenSans-Regular', marginVertical:scale(20) }} ></Text> */}

                    <Text allowFontScaling={false} style={{fontSize:scale(20), fontWeight:"bold", fontFamily:'Montserrat-Semibold' }} >3.2 RELEVANCE ALGORITHM</Text>
                    <Text allowFontScaling={false} style={{fontSize:scale(16), fontFamily:'OpenSans-Regular', marginVertical:scale(20) }} >Health Highway Private Limited’s relevance algorithm for the Practitioners is a fully automated system that matches Practitioners with customers. The matching of Practitioners with customers will be based on automated computation of the various factors including inputs made by the Users including their comments and feedback. Such factors may change from time to time, in order to improve the matching algorithm. Health Highway Private Limited in no event will be held responsible for the accuracy and the relevancy of matching customers with practitioners.</Text>

                    <Text allowFontScaling={false} style={{fontSize:scale(20), fontWeight:"bold", fontFamily:'Montserrat-Semibold' }} >3.3 LISTING CONTENT AND DISSEMINATING INFORMATION</Text>
                        <Text allowFontScaling={false} style={{fontSize:scale(16), fontFamily:'Montserrat-Regular', marginVertical:scale(20)}} >• 3.3.1 Health Highway Private Limited collects, directly or indirectly, and displays on the Website, relevant information regarding the profile and practice of the Practitioners listed on the Website, such as their specialization, qualification, fees, location, visiting hours, and similar details. Health Highway Private Limited takes reasonable efforts to ensure that such information is updated at frequent intervals. Although Health Highway Private Limited screens the information and photos submitted by the Practitioners, it cannot be held liable for any inaccuracies or incompleteness represented from it, despite such reasonable efforts.</Text>
                        <Text allowFontScaling={false} style={{fontSize:scale(16), fontFamily:'Montserrat-Regular', marginVertical:scale(20)}} >• 3.3.2 The Services provided by Health Highway Private Limited or any of its licensors or service providers are provided on an “as is” and “as available’ basis, and without any warranties or conditions (express or implied, including the implied warranties of merchantability, accuracy, fitness for a particular purpose, title and non-infringement, arising by statute or otherwise in law or from a course of dealing or usage or trade). Health Highway Private Limited does not provide or make any representation, warranty or guarantee, express or implied about the Website or the Services. Health Highway Private Limited does not guarantee the accuracy or completeness of any content or information provided by Users on the Website. To the fullest extent permitted by law, Health Highway Private Limited disclaims all liability arising out of the User’s use or reliance upon the Website, the Services, representations and warranties made by other Users, the content or information provided by the Users on the Website, or any opinion or suggestion given or expressed by Health Highway Private Limited or any User in relation to any User or services provided by such User.</Text>
                        <Text allowFontScaling={false} style={{fontSize:scale(16), fontFamily:'Montserrat-Regular', marginVertical:scale(20)}} >• 3.3.3 The Website may be linked to the website of third parties, affiliates and business partners. Health Highway Private Limited has no control over, and is not liable or responsible for content, accuracy, validity, reliability, quality of such websites or made available by/through our Website. Inclusion of any link on the Website does not imply that Health Highway Private Limited endorses the linked site. Users may use the links and these services at User’s own risk.</Text>
                        <Text allowFontScaling={false} style={{fontSize:scale(16), fontFamily:'Montserrat-Regular', marginVertical:scale(20)}} >• 3.3.4 Health Highway Private Limited assumes no responsibility, and shall not be liable for, any damages to, or viruses that may infect User’s equipment on account of User’s access to, use of, or browsing the Website or the downloading of any material, data, text, images, video content, or audio content from the Website. If a User is dissatisfied with the Website, User’s sole remedy is to discontinue using the Website.</Text>
                        <Text allowFontScaling={false} style={{fontSize:scale(16), fontFamily:'Montserrat-Regular', marginVertical:scale(20)}} >• 3.3.5 If Health Highway Private Limited determines that you have provided fraudulent, inaccurate, or incomplete information, including through feedback, Health Highway Private Limited reserves the right to immediately suspend your access to the Website or any of your accounts with Health Highway Private Limited and makes such declaration on the website alongside your name/your studio’s name as determined by Health Highway Private Limited for the protection of its business and in the interests of Users. You shall be liable to indemnify Health Highway Private Limited for any losses incurred as a result of your misrepresentations or fraudulent feedback that has adversely affected Health Highway Private Limited or its Users.</Text>
                    {/* <Text allowFontScaling={false} style={{fontSize:scale(16), fontFamily:'OpenSans-Regular', marginVertical:scale(20) }} ></Text> */}

                    <Text allowFontScaling={false} style={{fontSize:scale(20), fontWeight:"bold", fontFamily:'Montserrat-Semibold' }} >3.4 BOOK APPOINTMENT AND CALL FACILITY</Text>
                    <Text allowFontScaling={false} style={{fontSize:scale(16), fontFamily:'OpenSans-Regular', marginVertical:scale(20) }} >Health Highway Private Limited may enable Users to connect with Practitioners through two methods: a) Book facility that allows Users to book an appointment through the Website; b) Value added communication services which connect Users directly to the Practitioner’s contact details provided on the Website.

3.4.1 Health Highway Private Limited will ensure Users are provided confirmed appointments on the Book facility. However, Health Highway Private Limited has no liability if such an appointment is later cancelled by the Practitioner, or the same Practitioner is not available for appointment.

3.4.2 If a User has utilized the telephonic services, Health Highway Private Limited reserves the right to share the information provided by the User with the Practitioner and store such information and/or conversation of the User with the Practitioner, in accordance with our (website Privacy Policy link).

3.4.3 The results of any search Users performed on the Website for Practitioners should not be construed as an endorsement by Health Highway Private Limited of any such particular Practitioner. If the User decides to engage with a Practitioner to seek Yoga services, the User shall be doing so at his/her own risk.

3.4.4 Without prejudice to the generality of the above, Health Highway Private Limited is not involved in providing any healthcare or medical advice or diagnosis and hence is not responsible for any interactions between User and the Practitioner. User understands and agrees that Health Highway Private Limited will not be liable for:

User interactions and associated issues User has with the Practitioner;

The ability or intent of the Practitioner(s) or the lack of it, in fulfilling their obligations towards Users;

Any wrong medication or quality of treatment being given by the Practitioner(s), or any medical negligence on part of the Practitioner(s);

Inappropriate treatment, or similar difficulties or any type of inconvenience suffered by the User due to a failure on the part of the Practitioner to provide agreed Services;

Any misconduct or inappropriate behaviour by the Practitioner or the Practitioner’s staff;

3.4.5 Users are allowed to provide feedback about their experiences with the Practitioner, however, the User shall ensure that the same is provided in accordance with applicable law. User however understands that, Health Highway Private Limited shall not be obliged to act in such manner as may be required to give effect to the content of Users feedback, such as suggestions for delisting of a particular Practitioner from the Website.

3.4.6 Cancellation and Refund Policy

In the event that, the Practitioner with whom User has booked a paid appointment via the Website, has not been able to meet the User, User will need to write to us at healthhighway2020@gmail.com within five (5) days from the occurrence of such event; in which case, the entire consultation amount as mentioned on the Website will be refunded to the User within the next five (5) to six (6) business days in the original mode of payment done by the User while booking. In case where the User does not show up for the appointment booked with a Practitioner, without cancelling the appointment beforehand, the amount will not be refunded. However, where cancellation charges have been levied (as charged by the Practitioner/Practice), you would not be entitled to complete refund even if you have cancelled beforehand

In cases where the Practitioner is unable to meet the User at the scheduled appointment time, the User will be entitled to the rescheduling of the appointment</Text>


                    <Text allowFontScaling={false} style={{fontSize:scale(20), fontWeight:"bold", fontFamily:'Montserrat-Semibold' }} >3.5 NO PRACTITIONER USER RELATIONSHIP; NOT FOR EMERGENCY USE</Text>
                    <Text allowFontScaling={false} style={{fontSize:scale(16), fontFamily:'OpenSans-Regular', marginVertical:scale(20) }} >3.5.1 It is hereby expressly clarified that, the Information that you obtain or receive from Health Highway Private Limited, and its employees, contractors, partners, sponsors, advertisers, licensors or otherwise on the Website is for informational purposes only. We make no guarantees, representations or warranties, whether expressed or implied, with respect to professional qualifications, quality of work, expertise or other information provided on the Website. In no event shall we be liable to you or anyone else for any decision made or action taken by you in reliance on such information.

3.5.2 The Services are not intended to be a substitute for getting in touch with emergency healthcare. If you are an End-User facing a medical emergency (either on your or another person’s behalf), please contact an ambulance service or hospital directly.</Text>

                    <Text allowFontScaling={false} style={{fontSize:scale(20), fontWeight:"bold", fontFamily:'Montserrat-Semibold' }} >3.6 EXPRESS DISCLAIMERS</Text>
                    <Text allowFontScaling={false} style={{fontSize:scale(16), fontFamily:'OpenSans-Regular', marginVertical:scale(20) }} >Health Highway Private Limited is not a medical service provider, nor is it involved in providing any healthcare or medical advice or diagnosis, it shall hence not be responsible and owns no liability to either Users or Practitioners for any outcome from the consultation between the User and the Practitioner.</Text>

                    <Text allowFontScaling={false} style={{fontSize:scale(20), fontWeight:"bold", fontFamily:'Montserrat-Semibold' }} >3.7 TERMS FOR PRACTITIONERS</Text>
                    <Text allowFontScaling={false} style={{fontSize:scale(16), fontFamily:'OpenSans-Regular', marginVertical:scale(20) }} >The Practitioner shall promptly reply to the User after receiving User’s communication. In case of non-compliance with regard to adhering to the applicable laws/rules/regulations/guidelines by the Practitioner, Health Highway Private Limited shall have the right to replace such Practitioners for the purpose of consultation to the User or remove such Practitioners from the platform/Health Highway Private Limited application/site;

The Practitioner understands and agrees that, Health Highway Private Limited shall at its sole discretion, at any time be entitled to, show other Practitioners available for booking.

The Practitioner further understands that, there is a responsibility on the practitioner end to treat the User, pari passu, as the Practitioner would have otherwise treated the User on a physical one-on-one model.

The Practitioner shall at all times ensure that all the applicable laws that govern the Practitioner shall be followed and utmost care shall be taken in terms of the consultation being rendered.

The Practitioner acknowledges that should Health Highway Private Limited find the Practitioner to be in violation of any of the applicable laws/rules/ regulations/guidelines set out by the authorities then Health Highway Private Limited shall be entitled to cancel the booking with such Practitioner or take such other legal action as may be required.

The payment gateway option is being provided to the Users to make payment easier. In case wrong bank account details are provided by Practitioner, Health Highway Private Limited will not be responsible for loss of money, if any. In case of a technical failure, at the time of transaction or a problem in the payment process, you could contact healthhighway2020@gmail.com.

It is further understood by the Practitioner that the information that is disclosed by the User at the time of consultation is personal information and is subject to all applicable privacy laws, shall be confidential in nature and subject to User and Practitioner privilege.

The Practitioner understands that when a User books a time-slot with the Practitioner for an online session, the Practitioner must comply with the time slot to the best of their availability. In case of delay, the practitioner must notify User to their best possible ability.

The Practitioner understands that Health Highway Private Limited makes no promise or guarantee for any uninterrupted communication and the Practitioner shall not hold Health Highway Private Limited liable, if for any reason the communication is not delivered to the User(s), or are delivered late or not accessed, despite the efforts undertaken by Health Highway Private Limited.

It shall be the responsibility of the Practitioner to ensure that the information provided by User is accurate and not incomplete and understand that Health Highway Private Limited shall not be liable for any errors in the information included in any communication between the Practitioner and User.

The Practitioner shall indemnify and hold harmless Health Highway Private Limited and its affiliates, subsidiaries, directors, officers, employees and agents from and against any and all claims, proceedings, penalties, damages, loss, liability, actions, costs and expenses (including but not limited to court fees and attorney fees) arising due to the services provided by Practitioner, violation of any law, rules or regulations by the Practitioner or due to such other actions, omissions or commissions of the Practitioner that gave rise to the claim.

3.8.1 The contents listed on the Website are (i) User generated content, or (ii) belong to Health Highway Private Limited. The information that is collected by Health Highway Private Limited directly or indirectly from the End- Users and the Practitioners shall belong to Health Highway Private Limited. Copying of the copyrighted content published by Health Highway Private Limited on the Website for any commercial purpose or for the purpose of earning profit will be a violation of copyright and Health Highway Private Limited reserves its rights under applicable law accordingly.

3.8.2 Health Highway Private Limited authorizes the User to view and access the content available on or from the Website solely for ordering, receiving, delivering and communicating only as per this Agreement. The contents of the Website, information, text, graphics, images, logos, button icons, software code, design, and the collection, arrangement and assembly of content on the Website (collectively, “Health Highway Private Limited Content”), are the property of Health Highway Private Limited and are protected under copyright, trademark and other laws. User shall not modify the Health Highway Private Limited Content or reproduce, display, publicly perform, distribute, or otherwise use the Health Highway Private Limited Content in any way for any public or commercial purpose or for personal gain.

3.8.3 User shall not access the Services for purposes of monitoring their availability, performance or functionality, or for any other benchmarking or competitive purposes.</Text>

                    <Text allowFontScaling={false} style={{fontSize:scale(20), fontWeight:"bold", fontFamily:'Montserrat-Semibold' }} >3.9 REVIEWS AND FEEDBACK</Text>
                    <Text allowFontScaling={false} style={{fontSize:scale(16), fontFamily:'OpenSans-Regular', marginVertical:scale(20) }} >By using this Website, you agree that any information shared by you with Health Highway Private Limited or with any Practitioner will be subject to our Privacy Policy.

You are solely responsible for the content that you choose to submit for publication on the Website, including any feedback, ratings, or reviews (“Critical Content”) relating to Practitioners or other healthcare professionals. The role of Health Highway Private Limited in publishing Critical Content is restricted to that of an ‘intermediary’ under the Information Technology Act, 2000. Health Highway Private Limited disclaims all responsibility with respect to the content of Critical Content, and its role with respect to such content is restricted to its obligations as an ‘intermediary’ under the said Act. Health Highway Private Limited shall not be liable to pay any consideration to any User for re-publishing any content across any of its platforms.

Your publication of reviews and feedback on the Website is governed by Clause 5 of these Terms. Without prejudice to the detailed terms stated in Clause 5, you hereby agree not to post or publish any content on the Website that (a) infringes any third-party intellectual property or publicity or privacy rights, or (b) violates any applicable law or regulation, including but not limited to the IG Rules and SPI Rules. Health Highway Private Limited, at its sole discretion, may choose not to publish your reviews and feedback, if so required by applicable law, and in accordance with Clause 5 of these Terms. You agree that Health Highway Private Limited may contact you through telephone, email, SMS, or any other electronic means of communication for the purpose of:

Obtaining feedback in relation to Website or Health Highway Private Limited’s services.

Obtaining feedback in relation to any Practitioners listed on the Website.

Resolving any complaints, information, or queries by Practitioners regarding your Critical Content.

You agree to provide your fullest cooperation further to such communication by Health Highway Private Limited</Text>

                    <Text allowFontScaling={false} style={{fontSize:scale(20), fontWeight:"bold", fontFamily:'Montserrat-Semibold' }} >4. TERMS OF USE PRACTITIONERS</Text>
                    <Text allowFontScaling={false} style={{fontSize:scale(16), fontFamily:'OpenSans-Regular', marginVertical:scale(20) }} >The terms in this Clause 4 are applicable only to Practitioners.

4.1 LISTING POLICY
4.1.1 Health Highway Private Limited, directly and indirectly, collects information regarding the Practitioners’ profiles, contact details, and practice. Health Highway Private Limited reserves the right to take down any Practitioner’s profile as well as the right to display the profile of the Practitioners, with or without notice to the concerned Practitioner. This information is collected for the purpose of facilitating interaction with the End-Users and other Users. If any information displayed on the Website in connection with you and your profile is found to be incorrect, you are required to inform Health Highway Private Limited immediately to enable Health Highway Private Limited to make the necessary amendments.

4.1.2 Health Highway Private Limited shall not be liable and responsible for the ranking of the Practitioners on external websites and search engines

4.1.3 Health Highway Private Limited shall not be responsible or liable in any manner to the Users for any losses, damage, injuries or expenses incurred by the Users as a result of any disclosures or publications made by Health Highway Private Limited, where the User has expressly or implicitly consented to the making of disclosures or publications by Health Highway Private Limited. If the User had revoked such consent under the terms of the Privacy Policy, then Health Highway Private Limited shall not be responsible or liable in any manner to the User for any losses, damage, injuries or expenses incurred by the User as a result of any disclosures made by Health Highway Private Limited prior to its actual receipt of such revocation.

4.1.4 Health Highway Private Limited reserves the right to moderate the suggestions made by the Practitioners through feedback and the right to remove any abusive or inappropriate or promotional content added on the Website. However, Health Highway Private Limited shall not be liable if any inactive, inaccurate, fraudulent, or non- existent profiles of Practitioners are added to the Website.

4.1.5 Practitioners explicitly agree that Health Highway Private Limited reserves the right to publish the Content provided by Practitioners to a third party including content platforms.

4.1.6 When you are listed on Health Highway Private Limited, End-Users may see your number.

4.1.7 You as a Practitioner hereby represent and warrant that you will use the Services in accordance with applicable law. Any contravention of applicable law as a result of your use of these Services is your sole responsibility, and Health Highway Private Limited accepts no liability for the same.

4.2 PROFILE OWNERSHIP AND EDITING RIGHTS
Health Highway Private Limited ensures easy access to the Practitioners by providing a tool to update your profile information. Health Highway Private Limited reserves the right of ownership of all the Practitioner’s profile and photographs and to moderate the changes or updates requested by Practitioners. However, Health Highway Private Limited takes the independent decision whether to publish or reject the requests submitted for the respective changes or updates. You hereby represent and warrant that you are fully entitled under law to upload all content uploaded by you as part of your profile or otherwise while using Health Highway Private Limited’s services, and that no such content breaches any third party rights, including intellectual property rights. Upon becoming aware of a breach of the foregoing representation, Health Highway Private Limited may modify or delete parts of your profile information at its sole discretion with or without notice to you.

4.3 REVIEWS AND FEEDBACK DISPLAY RIGHTS OF HEALTH HIGHWAY PRIVATE LIMITED
4.3.1 All Critical Content is content created by the Users of http://www.healthhighway.co.in/ (“Website”) and the clients of Health Highway Private Limited customers and Practitioners, including the End-Users. As a platform, Health Highway Private Limited does not take responsibility for Critical Content and its role with respect to Critical Content is restricted to that of an ‘intermediary’ under the Information Technology Act, 2000. The role of Health Highway Private Limited and other legal rights and obligations relating to the Critical Content are further detailed in Clauses 3.9 and 5 of these Terms.

4.3.2 Health Highway Private Limited reserves the right to collect feedback and Critical Content for all the Practitioners, Studios and Healthcare Providers listed on the Website.

4.3.3 Health Highway Private Limited shall have no obligation to pre-screen, review, flag, filter, modify, refuse or remove any or all Critical Content from any Service, except as required by applicable law.

4.3.4 You understand that by using the Services you may be exposed to Critical Content or other content that you may find offensive or objectionable. Health Highway Private Limited shall not be liable for any effect on Practitioner’s business due to Critical Content of a negative nature. In these respects, you may use the Service at your own risk. Health Highway Private Limited however, as an intermediary, takes steps as required to comply with applicable law as regards the publication of Critical Content. The legal rights and obligations with respect to Critical Content and any other information sought to be published by Users are further detailed in Clauses 3.9 and 5 of these Terms.

4.3.5 Health Highway Private Limited will take down information under standards consistent with applicable law, and shall in no circumstances be liable or responsible for Critical Content, which has been created by the Users. The principles set out in relation to third party content in the terms of Service for the Website shall be applicable mutatis mutandis in relation to Critical Content posted on the Website.

4.3.6 If Health Highway Private Limited determines that you have provided inaccurate information or enabled fraudulent feedback, Health Highway Private Limited reserves the right to immediately suspend any of your accounts with Health Highway Private Limited and makes such declaration on the website alongside your name/your studio’s name as determined by Health Highway Private Limited for the protection of its business and in the interests of Users.

4.4 RELEVANCE ALGORITHM
Health Highway Private Limited has designed the relevance algorithm in the best interest of the End-User and may adjust the relevance algorithm from time to time to improve the quality of the results given to the users. It is a pure merit driven, proprietary algorithm which cannot be altered for specific Practitioners. Health Highway Private Limited shall not be liable for any effect on the Practitioner’s business interests due to the change in the Relevance Algorithm.

4.5 INDEPENDENT SERVICES
Your use of each Service confers upon you only the rights and obligations relating to such Service, and not to any other service that may be provided by Health Highway Private Limited.

4.6 HEALTH HIGHWAY PRIVATE LIMITED REACH RIGHTS
Health Highway Private Limited reserves the rights to display sponsored ads on the Website. These ads would be marked as “Sponsored ads”. Without prejudice to the status of other content, Health Highway Private Limited will not be liable for the accuracy of information or the claims made in the Sponsored ads. Health Highway Private Limited does not encourage the Users to visit the Sponsored ads page or to avail any services from them. Health Highway Private Limited will not be liable for the service providers of the Sponsored ads.

You represent and warrant that you will use these Services in accordance with applicable law. Any contravention of applicable law as a result of your use of these Services is your sole responsibility, and Health Highway Private Limited accepts no liability for the same.

4.7 BOOK APPOINTMENT
4.7.1 As a valuable partner on our platform we want to ensure that the Practitioners experience on the Health Highway Private Limited booking platform is beneficial to both, practitioners and their Users.

4.7.2 Practitioner understands that Health Highway Private Limited shall not be liable, under any event, for any comments or feedback given by any of the Users in relation to the Services provided by Practitioner. The option of publishing or modifying or moderating or masking (where required by law or norm etc.) the feedback provided by Users shall be solely at the discretion of Health Highway Private Limited.</Text>

                    <Text allowFontScaling={false} style={{fontSize:scale(20), fontWeight:"bold", fontFamily:'Montserrat-Semibold' }} >5.RIGHTS AND OBLIGATIONS RELATING TO CONTENT</Text>
                    <Text allowFontScaling={false} style={{fontSize:scale(16), fontFamily:'OpenSans-Regular', marginVertical:scale(20) }} >5.1 As mandated by Regulation 3(2) of the IG Rules, Health Highway Private Limited hereby informs Users that they are not permitted to host, display, upload, modify, publish, transmit, update or share any information that:

belongs to another person and to which the User does not have any right to;

is grossly harmful, harassing, blasphemous, defamatory, obscene, pornographic, pedophilic, libelous, invasive of another’s privacy, hateful, or racially, ethnically objectionable, disparaging, relating or encouraging money laundering or gambling, or otherwise unlawful in any manner whatever;

harm minors in any way;

infringes any patent, trademark, copyright or other proprietary rights;

violates any law for the time being in force;

deceives or misleads the addressee about the origin of such messages or communicates any information which is grossly offensive or menacing in nature;

impersonate another person;

contains software viruses or any other computer code, files or programs designed to interrupt, destroy or limit the functionality of any computer resource;

threatens the unity, integrity, defence, security or sovereignty of India, friendly relations with foreign states, or public order or causes incitement to the commission of any cognizable offence or prevents investigation of any offence or is insulting any other nation.

5.2 Users are also prohibited from:

violating or attempting to violate the integrity or security of the Website or any Health Highway Private Limited Content;

transmitting any information (including job posts, messages and hyperlinks) on or through the Website that is disruptive or competitive to the provision of Services by Health Highway Private Limited;

intentionally submitting on the Website any incomplete, false or inaccurate information;

making any unsolicited communications to other Users;

using any engine, software, tool, agent or other device or mechanism (such as spiders, robots, avatars or intelligent agents) to navigate or search the Website;

using any engine, software, tool, agent or other device or mechanism (such as spiders, robots, avatars or intelligent agents) to navigate or search the Website;

copying or duplicating in any manner any of the Health Highway Private Limited Content or other information available from the Website or Mobile Application;

framing or hot linking or deep linking any Health Highway Private Limited Content.

circumventing or disabling any digital rights management, usage rules, or other security features of the Software.

5.3 Health Highway Private Limited, upon obtaining knowledge by itself or being brought to actual knowledge by an affected person in writing or through email signed with electronic signature about any such information as mentioned above, shall be entitled to disable such information that is in contravention of Clauses. Health Highway Private Limited shall also be entitled to preserve such information and associated records for at least 90 (ninety) days for production to governmental authorities for investigation purposes.

5.4 In case of non-compliance with any applicable laws, rules or regulations, or the Agreement (including the Privacy Policy) by a User, Health Highway Private Limited has the right to immediately terminate the access or usage rights of the User to the Website and Services and to remove non-compliant information from the Website.

5.5 Health Highway Private Limited may disclose or transfer User-generated information to its affiliates or governmental authorities in such manner as permitted or required by applicable law, and you hereby consent to such transfer. The SPI Rules only permit Health Highway Private Limited to transfer sensitive personal data or information including any information, to any other body corporate or a person in India, or located in any other country, that ensures the same level of data protection that is adhered to by Health Highway Private Limited as provided for under the SPI Rules, only if such transfer is necessary for the performance of the lawful contract between Health Highway Private Limited or any person on its behalf and the User or where the User has consented to data transfer.

Health Highway Private Limited respects the intellectual property rights of others and we do not hold any responsibility for any violations of any intellectual property rights</Text>

                    <Text allowFontScaling={false} style={{fontSize:scale(20), fontWeight:"bold", fontFamily:'Montserrat-Semibold' }} >6.TERMINATION</Text>
                    <Text allowFontScaling={false} style={{fontSize:scale(16), fontFamily:'OpenSans-Regular', marginVertical:scale(20) }} >6.1 Health Highway Private Limited reserves the right to suspend or terminate a User’s access to the Website and the Services with or without notice and to exercise any other remedy available under law, in cases where,

Such User breaches any terms and conditions of the Agreement;

A third party reports violation of any of its right as a result of your use of the Services;

Health Highway Private Limited is unable to verify or authenticate any information provided to Health Highway Private Limited by a User;

Health Highway Private Limited has reasonable grounds for suspecting any illegal, fraudulent or abusive activity on part of such User; or

Health Highway Private Limited believes in its sole discretion that User’s actions may cause legal liability for such User, other Users or for Health Highway Private Limited or are contrary to the interests of the Website.

6.2 Once temporarily suspended, indefinitely suspended or terminated, the User may not continue to use the Website under the same account, a different account or re-register under a new account. On termination of an account due to the reasons mentioned herein, such User shall no longer have access to data, messages, files and other material kept on the Website by such User. The User shall ensure that he/she/it has continuous backup of any medical services the User has rendered in order to comply with the User’s record keeping process and practices.</Text>

                    <Text allowFontScaling={false} style={{fontSize:scale(20), fontWeight:"bold", fontFamily:'Montserrat-Semibold' }} >7. LIMITATION OF LIABILITY</Text>
                    <Text allowFontScaling={false} style={{fontSize:scale(16), fontFamily:'OpenSans-Regular', marginVertical:scale(20) }} >In no event, including but not limited to negligence, shall Health Highway Private Limited, or any of its directors, officers, employees, agents or content or service providers (collectively, the “Protected Entities”) be liable for any direct, indirect, special, incidental, consequential, exemplary or punitive damages arising from, or directly or indirectly related to, the use of, or the inability to use, the Website or the content, materials and functions related thereto, the Services, User’s provision of information via the Website, lost business or lost End-Users, even if such Protected Entity has been advised of the possibility of such damages. In no event shall the Protected Entities be liable for:

provision of or failure to provide all or any service by Practitioners to End- Users contacted or managed through the Website;

any content posted, transmitted, exchanged or received by or on behalf of any User or other person on or through the Website;

any unauthorized access to or alteration of your transmissions or data; or

any other matter relating to the Website or the Service.

In no event shall the total aggregate liability of the Protected Entities to a User for all damages, losses, and causes of action (whether in contract or tort, including, but not limited to, negligence or otherwise) arising from this Agreement or a User’s use of the Website or the Services exceed, in the aggregate Rs. 1000/- (Rupees One Thousand Only).</Text>

                    <Text allowFontScaling={false} style={{fontSize:scale(20), fontWeight:"bold", fontFamily:'Montserrat-Semibold' }} >8. RETENTION AND REMOVAL</Text>
                    <Text allowFontScaling={false} style={{fontSize:scale(16), fontFamily:'OpenSans-Regular', marginVertical:scale(20) }} >Health Highway Private Limited may retain such information collected from Users from its Website or Services for as long as necessary, depending on the type of information; purpose, means and modes of usage of such information; and according to the SPI Rules. Computer web server logs may be preserved as long as administratively necessary.</Text>

                    <Text allowFontScaling={false} style={{fontSize:scale(20), fontWeight:"bold", fontFamily:'Montserrat-Semibold' }} >9. APPLICABLE LAW AND DISPUTE SETTLEMENT</Text>
                    <Text allowFontScaling={false} style={{fontSize:scale(16), fontFamily:'OpenSans-Regular', marginVertical:scale(20) }} >9.1 You agree that this Agreement and any contractual obligation between Health Highway Private Limited and User will be governed by the laws of India.

9.2 Any dispute, claim or controversy arising out of or relating to this Agreement, including the determination of the scope or applicability of this Agreement to arbitrate, or your use of the Website or the Services or information to which it gives access, shall be determined by arbitration in India, before a sole arbitrator appointed by Health Highway Private Limited. Arbitration shall be conducted in accordance with the Arbitration and Conciliation Act, 1996. The seat of such arbitration shall be Rishikesh. All proceedings of such arbitration, including, without limitation, any awards, shall be in the English language. The award shall be final and binding on the parties to the dispute

9.3 Subject to the above Clause 9.2, the courts at Rishikesh shall have exclusive jurisdiction over any disputes arising out of or in relation to this Agreement, your use of the Website or the Services or the information to which it gives access.</Text>

                    <Text allowFontScaling={false} style={{fontSize:scale(20), fontWeight:"bold", fontFamily:'Montserrat-Semibold' }} >10.CONTACT INFORMATION GRIEVANCE OFFICER</Text>
                    <Text allowFontScaling={false} style={{fontSize:scale(16), fontFamily:'OpenSans-Regular', marginVertical:scale(20) }} >10.1 If a User has any questions concerning Health Highway Private Limited, the Website, this Agreement, the Services, or anything related to any of the foregoing, contact details are as follows:
Company Name : Health Highway Private Limited
Address: 14, Bharat Vihar, Rishikesh, Uttarakhand - 249201
Email address: healthhighway2020@gmail.com</Text>

                    <Text allowFontScaling={false} style={{fontSize:scale(20), fontWeight:"bold", fontFamily:'Montserrat-Semibold' }} >11. SEVERABILITY</Text>
                    <Text allowFontScaling={false} style={{fontSize:scale(16), fontFamily:'OpenSans-Regular', marginVertical:scale(20) }} >If any provision of the Agreement is held by a court of competent jurisdiction or arbitral tribunal to be unenforceable under applicable law, then such provision shall be excluded from this Agreement and the remainder of the Agreement shall be interpreted as if such provision were so excluded and shall be enforceable in accordance with its terms; provided however that, in such event, the Agreement shall be interpreted so as to give effect, to the greatest extent consistent with and permitted by applicable law, to the meaning and intention of the excluded provision as determined by such court of competent jurisdiction or arbitral tribunal.</Text>

                    <Text allowFontScaling={false} style={{fontSize:scale(20), fontWeight:"bold", fontFamily:'Montserrat-Semibold' }} >12. WAIVER</Text>
                    <Text allowFontScaling={false} style={{fontSize:scale(16), fontFamily:'OpenSans-Regular', marginVertical:scale(20) }} >No provision of this Agreement shall be deemed to be waived and no breach excused, unless such waiver or consent shall be in writing and signed by Health Highway Private Limited. Any consent by Health Highway Private Limited to, or a waiver by Health Highway Private Limited of any breach by you, whether expressed or implied, shall not constitute consent, waiver of, or excuse for any other different or subsequent breach.</Text>

                    <Text allowFontScaling={false} style={{fontSize:scale(20), fontWeight:"bold", fontFamily:'Montserrat-Semibold' }} >YOU HAVE READ THESE TERMS OF USE AND AGREE TO ALL OF THE PROVISIONS CONTAINED ABOVE</Text>
                    

                </ScrollView>
            </View>
        )
    }
}

export default TncScreen;