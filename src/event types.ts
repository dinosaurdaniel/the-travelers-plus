type btn = {
	/**
	 * the room id for this button to bring the player to
	 */
	for: string,
	/**
	 * the button text
	 */
	text: string,
	/**
	 * if there is a requirement. defaults to false
	 */
	req?: boolean,
	/**
	 * an array of items needed to fulfil the requirement
	 */
	reqItems?: {id: string, title:string, count:number}[],
	/**
	 * if the required items should be consumed or not
	 */
	reqConsume?: boolean,
	/**
	 * if everyone or just one person has to fulfil the requirement
	 */
	reqForAll?: boolean,
	/**
	 * a looting room to check if the requirement has been fulfilled. defaults to `this.for`
	 * the way it works is
	 * if roomFromId(reqTarget) has been visited: requirement fulfilled
	 * else: requirement not fulfilled
	 */
	reqTarget?: string,
	/**
	 * lock it after one use (stuff like a hall collapsing)
	 */
	lock?: boolean,
	/**
	 * the target room to check if this button should be disabled. defaults to `this.for`
	 */
	lockTarget?: string,
	/**
	 * if the button should be hidden if the user doesn't meet the requirements
	 */
	hide?: boolean
	/**
	 * "leave" for a basic exit event button
	 */
} | 'leave';

export type room = {// text room
	/**
	 * the room id
	 */
	id: string,
	/**
	 * the title for the room
	 */
	title: string,
	/**
	 * the text body/description
	 */
	body: string,
	/**
	 * the body for if its already visited. if it is unspecified, no visited body is set
	 */
	visitedBody?: string,
	/**
	 * the looting screen to check to determine if its been visited yet
	 */
	visitTarget?: string,
	/**
	 * event to be emitted when a player enters this room
	 */
	action?: string,
	/**
	 * all the buttons for this screen
	 */
	btns: btn[]
} | {// loot room
	/**
	 * room id
	 */
	id: string,
	/**
	 * title for the looting screen
	 */
	title: string,
	/**
	 * body/description
	 */
	body: string,
	/**
	 * description if its been visited already. if it is unspecified, no visited body is set
	 */
	visitedBody?: string,
	/**
	 * event to be emitted when a player enters this room
	 */
	 action?: string,
	/**
	 * make sure this is this to true to tell tt+ to set this as a looting screen
	 */
	loot: true,
	/**
	 * the next room to bring the player to
	 * set to "leave" to have a looting screen end an event
	 */
	nextId: string,
	/**
	 * the weight limit of the room
	 */
	size: number,
	/**
	 * an array of loot that specifies the loot
	 */
	lootTable:{
		/**
		 * item id
		 */
		id:string,
		/**
		 * minimum amount
		 */
		min:number,
		/**
		 * maximum
		 */
		max:number,
		/**
		 * chance as a decimal (values >= 1 will guarantee loot)
		 */
		chance:number
	}[]
};

export type eventData = {
	/**
	 * event id
	 */
	id: string,
	/**
	 * chance as any number to spawn the event for houses and cities. higher means more common
	 */
	weight: number,
	/**
	 * all the rooms along with a main room
	 */
	rooms: {
		[key:string]:room,
		main:room
	}
};

export type eventTotal = {
	[key:string]:eventData[]
};