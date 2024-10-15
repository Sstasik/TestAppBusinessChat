import { Schema, model } from "mongoose"


const CompanySchema = new Schema({
	name: {type: String},
	botTree: {type: Object, default: null},
	admin: {type: Schema.Types.ObjectId, ref: 'users'}
});

const CompanyModel = model('companies', CompanySchema)

export default CompanyModel;
