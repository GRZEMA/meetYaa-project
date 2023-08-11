export interface UserModel {
	_id: string
	userName: string
	hashedPassword: string
	email?: string
	profilePicture?: string
	signedEvents?: any[]
	ownedEvents?: any[]
}
