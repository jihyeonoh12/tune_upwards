export interface User {
    email : string,
    favorites : [],
    histories : [],
}


export interface Image {
    label: string
}



export interface Album {
    id: {
        attributes: {
            'im:id' : string
        }
    }
    category: {
        label: string
    }
    'im:image': Image[]
    'im:artist': {
        label: string
    }
    'im:name': {
        label: string
    }
    'im:releaseDate': {
        attributes: {
            label: string
        }
    }
    link: {
        attributes: {
            href: string
        }
    }
}

export interface Song {
    trackName: string,
    previewUrl: string,
    trackId: number,
    trackViewUrl: string,
    artworkUrl60: string,
    collectionName?: string,
    artistName: string,
}

export interface Collection {
    releaseDate: string,
    collectionName: string,
    artworkUrl60: string,
    artistName: string,
    primaryGenreName: string,
    collectionViewUrl: string,
    artistViewUrl: string,
    collectionId: number
}

export interface LikedContent {
    liked: boolean
    detail : Collection[]
}

export  interface Liked {
    [key: number]: LikedContent
}