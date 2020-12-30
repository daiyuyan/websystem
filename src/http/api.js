//const rootUrl = "http://129.204.188.223:8080/lung";

const rootUrl="http://129.204.188.223:8084/lung/"
const createPrescriptionUrl = rootUrl + "/hims/prescription/submit";

const searchPrescriptionUrl = rootUrl + "/hims/prescription/search";

const searchClinicFormUrl = rootUrl + "/hims/clinic/clinic_form/search";

const queryClinicFormUrl = rootUrl + "/hims/clinic/clinic_form";

const retreatClinicFormsUrl = rootUrl + "/hims/clinic/retreats";

const retreatSingleClinicFormUrl = rootUrl + "/hims/clinic/retreat";

const registerClinicFormUrl = rootUrl + "/hims/clinic/clinic_register";

const queryDepartmentsUrl = rootUrl + "/hims/clinic/departments";

const queryDoctors = rootUrl + "/hims/clinic/doctors";

//const loginUrl = rootUrl + "/hims/auth/login";
const downloadurl = rootUrl+"/download";
const loginUrl=rootUrl+"/enter";

const socketURL = "ws://129.204.188.223:8084/lung/" + "/websocket";

const removeMedicationUrl = rootUrl + "/getFile";

const queryMedicationsUrl = rootUrl + "/hims/prescription/medications";

const fullRefundPrescriptionUrl = rootUrl + "/hims/prescription/refund";

const registerUrl =rootUrl +"/getPatientMessage";




export default {
  downloadurl,
  rootUrl,
  createPrescriptionUrl,
  searchPrescriptionUrl,
  searchClinicFormUrl,
  queryClinicFormUrl,
  retreatClinicFormsUrl,
  retreatSingleClinicFormUrl,
  registerClinicFormUrl,
  queryDepartmentsUrl,
  queryDoctors,
  loginUrl,
  registerUrl,
  removeMedicationUrl,
  queryMedicationsUrl,
  fullRefundPrescriptionUrl,
  socketURL,
  
};
