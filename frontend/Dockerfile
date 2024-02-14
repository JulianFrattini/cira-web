FROM node:latest

# obtain the port to expose the frontend
ARG PORT_FRONTEND
# set the PORT environment variable to the same port such that react picks it up
ENV PORT=${PORT_FRONTEND}

COPY package.json /frontend/
WORKDIR /frontend/
RUN npm install --save

COPY src /frontend/src/
COPY public /frontend/public/

EXPOSE ${PORT_FRONTEND}
CMD npm run build && npm run start