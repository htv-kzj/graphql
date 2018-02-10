import {
  GraphQLList,
} from 'graphql';
import { random, date, address } from 'faker';

import {
  VehicleType,
  EventType,
  VehicleEventType,
} from './types';

const Queries = {
  vehicles: {
    type: new GraphQLList(VehicleType),
    resolve: async () => {
      const vehicle = await new Promise(resolve =>
        setTimeout(() =>
          resolve(new Array(10).fill(undefined).map(() => ({
            vehicleId: random.uuid(),
            creationDate: date.recent(),
            lastUpdateDate: date.past(),
            lastKnownEventId: random.number(),
            displayName: random.number(),
          }))), 100));
      return vehicle;
    },
  },
  events: {
    type: new GraphQLList(EventType),
    resolve: async () => {
      const vehicle = await new Promise(resolve =>
        setTimeout(() =>
          resolve(new Array(10).fill(undefined).map(() => ({
            eventTypeId: random.uuid(),
            eventTypeName: random.word(),
          }))), 100));
      return vehicle;
    },
  },
  vehicleEvents: {
    type: new GraphQLList(VehicleEventType),
    resolve: async () => {
      const vehicle = await new Promise(resolve =>
        setTimeout(() =>
          resolve(new Array(10).fill(undefined).map(() => ({
            vehicleEventId: random.uuid(),
            vehicleId: random.number(),
            latitude: address.latitude(),
            longitude: address.longitude(),
            startTime: date.recent(),
            endTime: date.recent(),
            distance: random.number(),
            creationDate: date.past(),
            heading: random.number(),
            eventTypeId: random.number(),
            location: address.streetAddress(),
            streetSpeed: random.number(),
          }))), 100));
      return vehicle;
    },
  },
};

export {
  Queries,
};
