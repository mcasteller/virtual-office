# Tell Docker we want to use Node v10.14.2 installed in a alpine Linux image
FROM node:10.14.2-alpine

# --debug and inspect port
EXPOSE 5858 9229

# Create the working dir
RUN mkdir -p /opt/app/myproject-client
WORKDIR /opt/app/myproject-client

COPY package.json yarn.lock /opt/app/myproject-client/

# Install the node modules that the project needs
RUN yarn install

COPY . .

# Now our app lives in the container, we can run the command npm start
CMD [ "yarn", "start" ]