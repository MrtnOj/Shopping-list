const prod = {
    url: {
        API_URL: 'http://http://ec2-3-19-31-244.us-east-2.compute.amazonaws.com/api/'
    }
}

const dev = {
    url: {
        API_URL: 'http://localhost:8080/'
    }
}

export const config = process.env.NODE_ENV === 'development' ? dev : prod;