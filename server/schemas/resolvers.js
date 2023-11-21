const { User, Need } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (!context.user) {
        throw AuthenticationError;
      }

      return await User.findById(context.user._id);
    },
    need: async (parent, { needId }, context) => {
      if(!context.user) {
        throw AuthenticationError;
      }
      return await Need.findById(needId).populate('needAuthor');
    },
    // gets all needs (for homepage to show list of all available needs)
    allNeeds: async () => {
      return await Need.find();
    },
    me: async (parent, args, context) => {
      if(context.user) {
        return User.findOne({_id: context.user._id }).populate()
      }
    }
  },
  Mutation: {
    signup: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.verifyPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token };
    },
    addNeed: async (parent, { needText, needDate }, context) => {

      console.log(context.user._id)
      // if (context.user) {
      //   const need = await Need.create({
      //     needText,
      //     needDate,
      //     needAuthor: context.user._id,
      //   });
      //   await User.findOneAndUpdate(
      //     { _id: context.user._id },
      //     { $addToSet: { createdNeeds: need._id } }
      //   );
      //   return need;
      // } throw AuthenticationError;

      if (context.user) {
        const need = await Need.create({
          needText,
          needDate,
          needAuthor: context.user._id,
        });
        await need.populate('needAuthor');
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { createdNeeds: need._id } }
        );
        return need;
      } throw AuthenticationError;

    },
    removeNeed: async (parent, { needId }, context) => {
      if (context.user) {
        const need = await Need.findOne({
          _id: needId,
          needAuthor: context.user._id,
        });

        if (need) {
          await Need.findByIdAndDelete(needId);

          await User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { createdNeeds: needId } }
          );
        }
        return need;
      } throw AuthenticationError;
    },

    signUpForNeed: async (parent, { needId }, context) => {
      if (context.user) {
        const updatedNeed = await Need.findOneAndUpdate(
          { _id: needId },
          { $addToSet: { signedUpUsers: context.user._id } },
          { new: true, runValidators: true }
        );

        if (!updatedNeed) {
          throw new Error('Need not found!');
        }

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { signedUpNeeds: needId } }
        );

        return updatedNeed;
      }
      throw AuthenticationError;
    },

  },
};

module.exports = resolvers;
