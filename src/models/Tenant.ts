import { Schema, model, models } from "mongoose";

const TenantSchema = new Schema({
  name: String,
  domain: String,
  themeColor: String,
});

export default models.Tenant || model("Tenant", TenantSchema);
