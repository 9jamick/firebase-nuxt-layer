import { initializeApp, getApps, type FirebaseApp } from 'firebase/app'
import { getDatabase, ref as dbRef, set, get, update, remove, push, type Database, connectDatabaseEmulator } from 'firebase/database'

let app: FirebaseApp | null = null
let database: Database | null = null

export const useFirebase = () => {
  if (process.client && !app && !getApps().length) {
    const firebaseConfig = {
      apiKey: "demo-api-key",
      authDomain: "demo-project.firebaseapp.com",
      databaseURL: "http://127.0.0.1:9100?ns=demo-project",
      projectId: "demo-project"
    }
    app = initializeApp(firebaseConfig)
    database = getDatabase(app)
    
    try {
      connectDatabaseEmulator(database, '127.0.0.1', 9100)
    } catch (error) {}
  }

  return { app, database }
}

export const createUser = async (userData: { name: string; email: string }) => {
  const { database } = useFirebase()
  if (!database) throw new Error('Database not initialized')
  const usersRef = dbRef(database, 'users')
  const newUserRef = push(usersRef)
  await set(newUserRef, userData)
  return newUserRef.key
}

export const getUsers = async () => {
  const { database } = useFirebase()
  if (!database) return {}
  const usersRef = dbRef(database, 'users')
  const snapshot = await get(usersRef)
  return snapshot.exists() ? snapshot.val() : {}
}

export const updateUser = async (userId: string, userData: Partial<{ name: string; email: string }>) => {
  const { database } = useFirebase()
  if (!database) throw new Error('Database not initialized')
  const userRef = dbRef(database, `users/${userId}`)
  await update(userRef, userData)
}

export const deleteUser = async (userId: string) => {
  const { database } = useFirebase()
  if (!database) throw new Error('Database not initialized')
  const userRef = dbRef(database, `users/${userId}`)
  await remove(userRef)
}

export const createContact = async (userId: string, contactData: { type: string; value: string }) => {
  const { database } = useFirebase()
  if (!database) throw new Error('Database not initialized')
  const contactsRef = dbRef(database, `users/${userId}/contacts`)
  const newContactRef = push(contactsRef)
  await set(newContactRef, contactData)
  return newContactRef.key
}

export const getContacts = async (userId: string) => {
  const { database } = useFirebase()
  if (!database) return {}
  const contactsRef = dbRef(database, `users/${userId}/contacts`)
  const snapshot = await get(contactsRef)
  return snapshot.exists() ? snapshot.val() : {}
}

export const updateContact = async (userId: string, contactId: string, contactData: Partial<{ type: string; value: string }>) => {
  const { database } = useFirebase()
  if (!database) throw new Error('Database not initialized')
  const contactRef = dbRef(database, `users/${userId}/contacts/${contactId}`)
  await update(contactRef, contactData)
}

export const deleteContact = async (userId: string, contactId: string) => {
  const { database } = useFirebase()
  if (!database) throw new Error('Database not initialized')
  const contactRef = dbRef(database, `users/${userId}/contacts/${contactId}`)
  await remove(contactRef)
}

export const createCompany = async (companyData: { name: string; industry: string }) => {
  const { database } = useFirebase()
  if (!database) throw new Error('Database not initialized')
  const companiesRef = dbRef(database, 'companies')
  const newCompanyRef = push(companiesRef)
  await set(newCompanyRef, companyData)
  return newCompanyRef.key
}

export const getCompanies = async () => {
  const { database } = useFirebase()
  if (!database) return {}
  const companiesRef = dbRef(database, 'companies')
  const snapshot = await get(companiesRef)
  return snapshot.exists() ? snapshot.val() : {}
}

export const updateCompany = async (companyId: string, companyData: Partial<{ name: string; industry: string }>) => {
  const { database } = useFirebase()
  if (!database) throw new Error('Database not initialized')
  const companyRef = dbRef(database, `companies/${companyId}`)
  await update(companyRef, companyData)
}

export const deleteCompany = async (companyId: string) => {
  const { database } = useFirebase()
  if (!database) throw new Error('Database not initialized')
  const companyRef = dbRef(database, `companies/${companyId}`)
  await remove(companyRef)
}
