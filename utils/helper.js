const schemas = require('./schemas')

class Helper {

    static multiSplit(text, splits, joins) {
        for (let x = 0; x < splits.length; x++) {
            text = text.split(splits[x]).join(joins[x]);
        };
        return text;
    }

    static async getColor(id) {
        const user = await schemas.user.findOne({ userID: id });

        if (!user) {
            return process.env.COLOR;
        } else {
            return user.color;
        }
    }

    static pointsFormat(score) {
        let fm_score = score;
        if (score >= 1000) {
            let units = ['k', 'M', 'B', 'T'];
            let div = Math.floor((score.toFixed(0).length - 4) / 3);
            fm_score = `${Number(score / Math.pow(1000, 1 + div)).toFixed(2)}${units[div]}`;
        }
        return fm_score;
    }

    static findMember(message, args, sufixes) {
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        let IDarray = [];

        if (member) {
            IDarray.push(member.id);
        } else {
            let name = args.join(' ').toLowerCase();
            if (!name) return 'No found mention';
            if (sufixes) {
                sufixes.forEach(sufix => {
                    const sufixIndex = args.indexOf(sufix) == -1 ? 1 : args.indexOf(sufix);
                    if (name.includes(sufix)) name = args.slice(0, sufixIndex).join(' ').toLowerCase();
                })
            }

            let memberFind = message.guild.members.cache.find(member => member.user.tag.toLowerCase().includes(name) || member.displayName.toLowerCase().includes(name));
            memberFind ? IDarray.push(memberFind.id) : false
        };
        if (!IDarray.length) return 'No found user';
        return IDarray;
    }

    static dateFormat(time, { y = 'y', mo = 'mo', d = 'd', h = 'h', m = 'm', s = 's', ago = 'ago' }) {
        let text = '';
        let count = 0;
        let dateago = new Date(time).getTime();
        let datenew = new Date(Math.abs(Date.now() - dateago));

        let time_table = [
            { value: datenew.getUTCFullYear() - 1970, suffix: y },
            { value: datenew.getUTCMonth(), suffix: mo },
            { value: datenew.getUTCDate() - 1, suffix: d },
            { value: datenew.getUTCHours(), suffix: h },
            { value: datenew.getUTCMinutes(), suffix: m },
            { value: datenew.getUTCSeconds(), suffix: s }
        ];


        for (let i = 0; i < time_table.length; i++) {
            if (count < 2) {
                if (time_table[i].value > 0) {
                    text += `${time_table[i].value}${time_table[i].suffix} `;
                    count++;
                }
            } else {
                break;
            }
        }
        text += ago;
        return text;
    }
}

module.exports = Helper