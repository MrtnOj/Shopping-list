const prod = {
    url: {
        API_URL: 'http://ec2-18-191-229-230.us-east-2.compute.amazonaws.com/api/'
    }
}

const dev = {
    url: {
        API_URL: 'http://localhost:8080/api/'
    }
}

export const config = process.env.NODE_ENV === 'development' ? dev : prod;