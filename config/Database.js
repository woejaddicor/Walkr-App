import app from "./Firebase";
import { getDatabase } from "firebase/database";

const db = getDatabase(app);

export default db;
