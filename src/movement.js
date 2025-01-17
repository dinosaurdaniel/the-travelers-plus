const {emit, players, util, generateTileAt, chunks} = require('./bullet');

const DOUBLE_STEP_MULTIPLIER = 2;

/**
 * @param {object} packet 
 * @param {players.player} userData 
 */
module.exports.setDir = function(packet, userData) {
	if(userData.public.state !== 'travel')return;
	let allowedDirs = ['n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw', ''];
	if(typeof packet.autowalk === 'boolean' && typeof packet.dir === 'string' && allowedDirs.indexOf(packet.dir) !== -1)
	{
		const dir = packet.dir;
		userData.cache.travelData = {dir:dir, autowalk:packet.autowalk};
	}
}

/**
 * @param {object} packet 
 * @param {players.player} player 
 */
module.exports.doubleStep = function(packet, player) {
	if(player.public.state === 'travel')
	{
		if(packet.option)
		{
			if(packet.option === 'remove')
			{
				player.cache.doubleStep = false;
			}
			else if(packet.option === 'add' && player.public.skills.sp >= 10 && player.public.skills.carry <= player.public.skills.max_carry && generateTileAt(player.public.x, player.public.y) !== 'M')
			{
				player.cache.doubleStep = true;
			}
		}
	}
}

/**
 * @param {players.player} player 
 */
 module.exports.join = function(player) {
	player.cache.doubleStep = false;
}

/**
 * @param {players.player} player 
 */
module.exports.tick = function(player) {
	if(player.cache.travelData)
	{
		emit('travelers', 'movePlayer', player);
		if(player.cache.travelData && !player.cache.travelData.autowalk)
		{
			emit('travelers', 'stopPlayerMovement', player);
		}
	}
}

/**
 * @param {players.player} player 
 */
module.exports.move = function(player) {
	if(player.cache.travelData)
	{
		if(player.public.state !== 'travel') {
			emit('travelers', 'stopPlayerMovement', player);
			return false;
		}
		const val = util.out(1, 'int');
		emit('travelers', 'getMovementSpeed', player, val);
		let distance = (player.cache.doubleStep ? DOUBLE_STEP_MULTIPLIER: 1) * val.get();
		const initialDistance = distance;
		player.cache.doubleStep = false;
		while(distance > 0) {
			const {x, y} = util.compassChange(player.public.x, player.public.y, player.cache.travelData.dir, 1);
			
			const obj = chunks.getObject(x, y);
			
			const tile = generateTileAt(x, y);
			const onWater = tile === "w";
			const onBorder = tile === "░";
			if(obj) {
				const val = util.out(true, 'boolean');
				emit('travelers', 'canPlayerMoveOn', player, obj, val);
				if(!val.get()) {
					break;
				}
			} else {
				const out = util.out(!(onWater || onBorder), 'boolean');
				emit('travelers', 'canPlayerMoveOnTile', player, tile, out);
				if(!out.get()) {
					break;
				}
			}
			player.public.x = x;
			player.public.y = y;
			distance--;
			const val = util.out(false, 'boolean');
			emit('travelers', 'onPlayerStep', player, val);
			if(val.get())break;
		}
		if(initialDistance === distance) return false;// no movement happened
		player.addPropToQueue('x', 'y');
	}
	else return false;
}

/**
 * @param {players.player} player 
 */
module.exports.stopPlayerMovement = function(player) {
	player.cache.travelData = null;
	player.temp.server_stop = true;
	player.addPropToQueue('server_stop');
}
