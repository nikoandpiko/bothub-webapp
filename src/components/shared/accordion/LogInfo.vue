<template>
  <div class="log-entities__wrapper">
    <div class="level">
      <div
        class="level-left log-entities">
        <div v-if="entitiesList.length > 0">
          <strong>{{ $tc('webapp.inbox.entities', entitiesList.length) }}:</strong>
          <entity-tag
            v-for="(entity, i) in entitiesList"
            :key="i"
            :highlighted="entity.entity === highlighted"
            :color-class="entity.class"
            :entity-name="entity.entity"
            @mouseenter.native.stop="$emit('update:highlighted', entity.entity)"
            @mouseleave.native.stop="$emit('update:highlighted', null)"/>
        </div>
      </div>
      <div class="level-right">
        <b-button
          class="repository-log-info__button"
          rounded
          size="is-small"
          icon-left="chart-pie"
          @click="debug()"> {{ $t('webapp.inbox.debug') }} </b-button>
        <b-button
          class="repository-log-info__button"
          rounded
          size="is-small"
          icon-left="file-document-outline"
          @click="showRawInfo()"> {{ $t('webapp.inbox.raw') }} </b-button>
      </div>
    </div>
    <div class="log-infos level is-mobile">
      <div class="level-left">
        <div
          v-if="intent"
          class="level-item has-text-grey">
          <strong>{{ $t('webapp.inbox.intent') }}:&nbsp;</strong>
          <span>{{ intent }} ({{ confidence | percent }} {{ $t('webapp.inbox.confidence') }})</span>
        </div>
      </div>
      <div class="level-right">
        <div
          v-if="intent"
          class="level-item has-text-grey">
          <span>{{ createdAt | moment('from') }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EntityTag from '@/components/repository/repository-evaluate/example/EntityTag';

export default {
  name: 'LogInfo',
  components: {
    EntityTag,
  },
  props: {
    entitiesList: {
      type: Array,
      default: () => ([]),
    },
    intent: {
      type: String,
      default: '',
    },
    confidence: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: String,
      default: '',
    },
    highlighted: {
      type: String,
      default: null,
    },
  },
  methods: {
    showRawInfo() {
      this.$emit('onShowRawInfo');
    },
    debug() {
      this.$emit('debug');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../../assets/scss/utilities.scss';
.repository-log-info {
  &__button {
    margin-right: 0.5rem;
    color: #707070;
  }
}

.log {
  $radius: .5rem;

  margin: 1rem .5rem;
  overflow: visible;
  background-color: $white-bis;
  border-radius: $radius;

  &-text {
    display: flex;
    padding: 1rem 2rem;
    margin-bottom: 4px;
    background-color: $white-ter;
    border-radius: $radius;
    transition: box-shadow .2s ease;

    &__main {
      flex-grow: 1;
      font-size: 1.25rem;
    }

    &__rigth {
      flex-grow: 0;
    }
  }

  &-entities,
  &-infos {
    padding: .25rem .5rem .3rem 1rem;
  }

  &-entities {

    &__wrapper {
      margin: 0 0 0 2.5rem;
    }

    > * {
      margin: 0 .5rem 0 0;

      &:last-child {
        margin: 0;
      }
    }
  }
}
</style>
