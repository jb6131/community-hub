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
    singleNeed: async (parent, { needId }, context) => {
      if(!context.user) {
        throw AuthenticationError;
      }
      
      const need = await Need.findById(needId)
        .populate('needAuthor')
        .populate('signedUpUsers');

      if (!need) {
        throw new Error ('Need not found');
      }

      return need;
    },
    // gets all needs (for homepage to show list of all available needs)
    allNeeds: async () => {
      return await Need.find({}).populate('needAuthor');
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
        console.log(need)
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

        const populatedNeed = await Need.findById(updatedNeed._id)
          .populate('needAuthor')
          .populate('signedUpUsers');

        return populatedNeed;
      }
      throw AuthenticationError;
    },

  },
};

module.exports = resolvers;
