FROM node:10

# Create app directory
WORKDIR /opt/

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 3000

ENV ATLAS_PASSWORD=vkz41ITyig2g1D8v

CMD [ "npm", "run", "serve" ]