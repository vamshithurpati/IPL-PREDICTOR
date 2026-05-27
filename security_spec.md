# Security Specification for IPL Oracle AI

## Data Invariants
1. A team must have a unique identifier.
2. A player must belong to a valid team.
3. A match must involve two valid, distinct teams.
4. A prediction must be linked to a valid match and the user who generated it.
5. Users can only delete their own predictions.
6. Public data (teams, players, matches) is read-only for regular users.

## The Dirty Dozen (Attack Payloads)
1. **Identity Spoofing**: Attempt to create a prediction with a `userId` that is not the authenticated user's.
2. **Schema Poisoning**: Attempt to inject a 2MB string into a team name.
3. **Invalid Team Reference**: Create a player with a `teamId` that doesn't exist.
4. **Self-Opponent Match**: Create a match where `team1Id` == `team2Id`.
5. **Unauthorized Match Update**: A regular user trying to change a match result.
6. **Prediction Hijacking**: User A trying to update User B's prediction.
7. **Negative Stats**: Setting a player's runs to -1000.
8. **Invalid Status**: Setting a match status to "invalid_status".
9. **Email Spoofing (Admin)**: Attempting to access admin-only data by spoofing a non-verified email.
10. **Resource Exhaustion**: Sending a payload with 500 extra "shadow" fields.
11. **Future Prediction Modification**: Trying to change the `matchId` of an existing prediction.
12. **Immutable Field Write**: Attempting to change the `timestamp` of a prediction during an update.

## Hardened Rules Strategy
- `allow read: if true;` for public entities (Team, Player, Match).
- `allow write: if isAdmin();` for public entities.
- `allow create: if isSignedIn() && isValidPrediction(incoming());` for Predictions.
- `allow update, delete: if isOwner(existing().userId);` for Predictions.
- Use `request.time` for timestamps.
