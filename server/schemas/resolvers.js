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
    need: async (parent, args, context) => {
      if(!context.need) {
        throw AuthenticationError;
      }
      return await Need.findById(context.need._id)
    },
    allNeeds: async () => {
      return User.find().populate('createdNeeds');
    },
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
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { createdNeeds: need._id } }
        );
        return need;
      } throw AuthenticationError;
    },
    removeNeed: async (parent, { needId }, context) => {
      if (context.user) {
        const need = await Need.findByIdAndDelete({
          _id: needId,
          needAuthor: context.user._id,
        });

        await User.findOneAndUpdate(
          { _id: context.user_id },
          { $pull: { createdNeeds: needId } }
        );
        return need;
      } throw AuthenticationError;
    },
    signUpForNeed: async (parent, { needId }, context) => {
      if (context.user) {
        return Need.findOneAndUpdate(
          { _id: needId },
          {
            $addToSet: {
              signedUpUsers: context.user._id,
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
