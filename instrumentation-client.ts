import { initBotId } from 'botid/client/core';

// BotID only attaches its headers to the paths listed here; a path missing from this list
// makes checkBotId() fail closed on the server.
initBotId({
  protect: [{ path: '/api/reviews', method: 'POST' }]
});
