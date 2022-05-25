class Story {
    constructor(title, creator) {
        this.title = title;
        this.creator = creator;
        this._comment = [];
        this._likes = [];
    }

    get likes() {
        if (this._likes.length === 0) {
            return `${this.title} has 0 likes`;
        }

        let username = this._likes[0];
        if (this._likes.length === 1) {
            return `${username} likes this story!`;
        }

        return `${username} and ${this._likes.length - 1} others like this story!`;
    }

    like(username) {
        if (this._likes.includes(username)) {
            throw new Error(`You can't like the same story twice!`);
        }

        if (this.creator === username) {
            throw new Error(`You can't like your own story!`);
        }

        this._likes.push(username);

        return `${username} liked ${this.title}!`
    }

    dislike(username) {
        if (!this._likes.includes(username)) {
            throw new Error(`You can't dislike this story!`);
        }
        this._likes = this._likes.filter(u => u !== username);
        return `${username} disliked ${this.title}`;
    }

    comment(username, content, id) {
        if (id === undefined || !this._comment.some(c => c.Id === id)) {
            let newComment = {
                Id: this._comment.length + 1,
                Username: username,
                Content: content,
                Replies: []
            };

            this._comment.push(newComment);

            return `${username} commented on ${this.title}`
        }
        let commentToReply = this._comment.find(c => c.Id === id);
        let replyNextId = commentToReply.Replies.length + 1;
        let replyId = Number(`${commentToReply.Id}.${replyNextId}`);
        let reply = {
            Id: replyId,
            Username: username,
            Content: content
        };

        commentToReply.Replies.push(reply);

        return `You replied successfully`;
    }

    toString(sortingType) {
        let result = [];

        const sortVersion = {
            asc: (a, b) => a.Id - b.Id,
            desc: (a, b) => b.Id - a.Id,
            username: (a, b) => a.Username.localeCompare(b.Username)
        }
        result.push(`Title: ${this.title}\nCreator: ${this.creator}\nLikes: ${this._likes.length}\nComments:`);

        this._comment.sort(sortVersion[sortingType]).forEach(c => {
            result.push(`-- ${c.Id}. ${c.Username}: ${c.Content}`)
                c.Replies
                    .sort(sortVersion[sortingType])
                    .forEach(r => {
                        result.push(`--- ${r.Id}. ${r.Username}: ${r.Content}`)
                    });
        });

        return result.join('\n');
    }
}

let art = new Story("My Story", "Anny");
art.like("John");
console.log(art.likes);
art.dislike("John");
console.log(art.likes);
art.comment("Sammy", "Some Content");
console.log(art.comment("Ammy", "New Content"));
art.comment("Zane", "Reply", 1);
art.comment("Jessy", "Nice :)");
// art.comment("Jessy", "Nice :)",1);
console.log(art.comment("SAmmy", "Reply@", 1));
console.log()
console.log(art.toString('username'));
console.log()
art.like("Zane");
console.log(art.toString('desc'));

