// import mongoose from "mongoose";
// import Role, { PermissionType } from "./models/role";
// import { appConfig } from "./app-utilities/app-config";

// const roles = [
//   {
//     name: "ADMIN",
//     permissions: [
//       { type: PermissionType.API_RESOURCE, value: "/product/create" },
//       { type: PermissionType.API_RESOURCE, value: "/product/read" },
//       { type: PermissionType.API_RESOURCE, value: "/product/update" },
//       { type: PermissionType.API_RESOURCE, value: "/product/delete" },
//     ],
//   },
//   {
//     name: "USER",
//     permissions: [
//       { type: PermissionType.API_RESOURCE, value: "/product/read" },
//     ],
//   },
// ];

// async function seedRoles() {
//   try {
//     await mongoose.connect(appConfig.MONGO_URI!);

//     for (const roleData of roles) {
//       const existing = await Role.findOne({ name: roleData.name });
//       if (!existing) {
//         await Role.create(roleData);
//         console.log(`Role "${roleData.name}" created.`);
//       } else {
//         console.log(`Role "${roleData.name}" already exists.`);
//       }
//     }

//     await mongoose.disconnect();
//     console.log("Seeding complete.");
//   } catch (err) {
//     console.error("Error seeding roles:", err);
//     process.exit(1);
//   }
// }

// seedRoles();
