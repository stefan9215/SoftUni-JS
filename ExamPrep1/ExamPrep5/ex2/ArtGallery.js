class ArtGallery {
    constructor(creator) {
        this.creator = creator;
        this.possibleArticles = {picture: 200, photo: 50, item: 250};
        this.listOfArticles = [];
        this.guests = [];
    }

    addArticle(articleModel, articleName, quantity) {
        articleModel = articleModel.toLowerCase();
        if (!this.possibleArticles.hasOwnProperty(articleModel)) {
            throw new Error('This article model is not included in this gallery!');
        }

        let newArt = {
            articleModel,
            articleName,
            quantity
        }

        let searchedArticle = this.listOfArticles.filter(art => art['articleModel'] == articleModel && art['articleName'] == articleName)[0];

        if (searchedArticle == undefined) {
            this.listOfArticles.push(newArt);
        } else {
            searchedArticle['quantity'] += quantity;
        }
        console.log(this.listOfArticles)

        return `Successfully added article ${articleName} with a new quantity- ${quantity}.`
    }

    inviteGuest(guestName, personality) {
        let guest = this.guests.filter(g => g['guestName'] == guestName)[0];


        let points = 0;
        switch (personality) {
            case 'Vip' :
                points = 500;
                break;
            case 'Middle':
                points = 250;
                break;
            default:
                points = 50;
                break;
        }

        if (guest != undefined) {
            throw new Error(`${guestName} has already been invited.`);
        } else {
            this.guests.push({
                guestName,
                points,
                purchaseArticle: 0
            });
        }

        return `You have successfully invited ${guestName}!`;
    }

    buyArticle(articleModel, articleName, guestName) {
        articleModel = articleModel.toLowerCase();
        let searchedArticle = this.listOfArticles.filter(art => art['articleModel'] == articleModel && art['articleName'] == articleName)[0];
        let guest = this.guests.filter(g => g['guestName'] == guestName)[0];

        if (searchedArticle == undefined) {
            throw new Error(`This article is not found.`);
        }

        if (searchedArticle.quantity == 0) {
            return `The ${articleName} is not available.`;
        }

        if (guest == undefined) {
            return `This guest is not invited.`;
        }

        let articlePoints = this.possibleArticles[articleModel];
        if (guest.points < articlePoints) {
            return `You need to more points to purchase the article.`;
        }
        guest.points -= articlePoints;
        guest.purchaseArticle += 1;
        searchedArticle.quantity -= 1;

        return `${guestName} successfully purchased the article worth ${articlePoints} points.`
    }

    showGalleryInfo(criteria) {
        const result = [];
        if (criteria == 'article') {
            result.push('Articles information:');
            this.listOfArticles.forEach(a => {
                result.push(`${a.articleModel} - ${a.articleName} - ${a.quantity}`)
            })
        } else if (criteria == 'guest') {
            result.push("Guests information:");
            this.guests.forEach(g => {
                result.push(`${g.guestName} - ${g.purchaseArticle}`)
            })
        }

        return result.join('\n');
    }

}

const artGallery = new ArtGallery('Curtis Mayfield');
console.log(artGallery.addArticle('picture', 'Mona Liza', 3));
console.log(artGallery.addArticle('Item', 'Ancient vase', 2));
console.log(artGallery.addArticle('PICTURE', 'Mona Liza', 1));
console.log(artGallery.addArticle('PICTURE', 'Mona', 1));
console.log(artGallery.addArticle('photo', 'Mona Liza', 3));

console.log(artGallery.inviteGuest('John', 'Vip'));
console.log(artGallery.inviteGuest('Peter', 'Middle'));

console.log(artGallery.buyArticle('Picture', 'Mona Liza', 'John'));
console.log(artGallery.buyArticle('picture', 'Mona Liza', 'John'));
console.log(artGallery.buyArticle('photo', 'Mona Liza', 'John'));
console.log(artGallery.buyArticle('item', 'Ancient vase', 'Peter'));

console.log(artGallery.showGalleryInfo('article'));
console.log(artGallery.showGalleryInfo('guest'));



